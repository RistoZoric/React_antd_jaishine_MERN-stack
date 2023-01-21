import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';

import { createOrder, cancelOrder, payOrder } from '../../../actions/order';
import { addFunds } from '../../../actions/account';
import { messages, getMessage } from '../../../actions/message';
import { reviewAction } from '../../../actions/review';


const DogWalkerList = ({
    createOrder,
    cancelOrder,
    payOrder,
    addFunds,
    messages,
    getMessage,
    reviewAction
}) => {

    const client = useSelector((state) => state.auth.user);
    const users = useSelector((state) => state.auth.allUser);

    const [walkerData, setWalkerData] = useState([]);
    const [searchData, setSearchData] = useState(walkerData);
    const [dogData, setDogData] = useState([]);
    const [show, setShow] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [contact, setContact] = useState(false);
    const [distance, setDistance] = useState('');
    const [view, setView] = useState(0);
    const [orders, setOrders] = useState([]);
    const [names, setName] = useState("");
    const [review, setReview] = useState(false);

    const initialForm = {
        dogName: '',
        from: '',
        to: '',
        budget: '',
        proposal: '',
    }
    const initialMessageForm = {
        otherName: '',
        message: '',
    }
    const [formData, setFormData] = useState(initialForm);
    const [messageForm, setMessageForm] = useState(initialMessageForm);
    const [edit, setEdit] = useState(false);
    const [messageData, setMessageData] = useState([]);
    const { walker, message } = messageForm;
    const { dogName, from, to, budget, proposal } = formData;
    const [messageContent, setMessageContent] = useState([]);
    let initialState = [];
    const [walkerId, setWalkerId] = useState("");
    const [updateData, setUpdateData] = useState({});
    const [ranking, setRanking] = useState([]);
    const set = () => {
        if (users !== undefined) {
            initialState = [];
            users.map((users) => {
                if (users.userType === "dogWalker" && users.status === true) {
                    initialState.push({
                        id: users._id,
                        name: users.name,
                        contactNumber: users.request.length,
                        finished: users.request.filter((request) => request.status === "Done").length,
                        city: users.city,
                        position: users.position,
                        profile: users.profile,
                        birthday: users.profile.birthday === null ? "" : users.profile.birthday.slice(0, 10),
                        description: users.profile.description,
                        request: users.request,
                        review: users.review,
                    })
                }
            })
        }
    }

    useEffect(() => {
        set();
        setDogData(client.dogProfile);
        setMessageData(client.messages);
        setFormData(initialForm);
        setWalkerData(initialState);
        setSearchData(initialState);
        setOrders(orderInitial);

    }, [users, client]);
    let [profileData, setProfileData] = useState({});

    let total_rating = 0;
    let avr_rating = 0;
    let rankingView;
    const showProfile = (id, type, name, birthday, city, description, phone, review) => {
        setShow(true);
        rankingView = [];
        if (review.length === 0) {
            total_rating = 0;
            avr_rating = 0;
            for (let i = 5; i > 0;) {
                
                    rankingView.push(<input disabled type="radio" name="communication" value="5" id={"zz" + i} />);
                    rankingView.push(<label htmlFor={"zz" + i}>☆</label>);
                
                i--;
            }
        }
         else {
            review.map((rev) => {
                total_rating = parseInt(total_rating) + parseInt(rev.rating);
            });
            avr_rating = Math.round(total_rating / review.length);

            for (let i = 5; i > 0;) {
                if (i === avr_rating) {
                    rankingView.push(<input disabled type="radio" checked name="communication" value="5" id={"zz" + i} />);
                    rankingView.push(<label htmlFor={"zz" + i}>☆</label>);
                } else {
                    rankingView.push(<input disabled type="radio" name="communication" value="5" id={"zz" + i} />);
                    rankingView.push(<label htmlFor={"zz" + i}>☆</label>);
                }
                i--;
            }
        }
        setRanking(rankingView);
        setProfileData({ id: id, type: type, name: name, birthday: birthday.slice(0, 10), city: city, description: description, phone: phone });
    }
    const dogList = dogData.map((dog) => {
        return <option value={dog.name}>{dog.name}</option>
    });
    let messageList = "No Messages";
    const contactBtnClicked = (name) => {
        setName(name);
        setContact(true);
        setMessageForm({ ...messageForm, "otherName": name });
        GetMessage(name);
    }
    const GetMessage = (names) => {
        getMessage(names);
        messageData.map((walker) => {
            let className;
            if (walker.otherName === names) {
                messageList = walker.message.map((message) => {
                    if (message.where === "from") className = "msg-from"
                    else className = "msg-to"
                    return <div className={className}>{message.content}</div>
                })
            }
        })
        setMessageContent(messageList);
    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const messageInput = (e) => {
        setMessageForm({ ...messageForm, [e.target.name]: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        createOrder(formData, updateData, edit);
        setEdit(false);
        setShowMessage(false);
    };
    const MessageToAction = (e) => {
        e.preventDefault();
        messages(messageForm);
        setMessageForm(initialMessageForm);
        GetMessage(names);
        setContact(false);
    }
    let result;
    const onSearch = (e) => {
        e.preventDefault();
        const R = 6371;
        result = walkerData.filter((walker) => {
            const lat1 = client.position[0].x;
            const lat2 = walker.position[0].x;
            const lon1 = client.position[0].y;
            const lon2 = walker.position[0].y;

            const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;

            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const d = R * c; // in killometres
            return d < distance;
        })
        setSearchData(result);
    }
    const changeHandler = (e) => {
        if (e.target.value === "") { setDistance(""); setSearchData(walkerData) }
        else setDistance(e.target.value);
    }
    //MDBTable
    const walkerList = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Finished Projects',
                field: 'finished',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Contacted Number',
                field: 'contactNumber',
                sort: 'asc',
                width: 150
            },
            {
                label: 'City',
                field: 'city',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Contact',
                field: 'contact',
                sort: 'asc',
                width: 200
            },
        ],
        rows: searchData.map((walker) => {
            return (
                {
                    name: walker.name,
                    finished: walker.finished,
                    contactNumber: walker.contactNumber,
                    city: walker.city,
                    contact: <div>
                        <button
                            onClick={() => {
                                setShowMessage(true);
                                setUpdateData({ walkerName: walker.name, timestamp: "0" });

                            }}
                            className="btn btn-success">
                            Choose
                        </button>
                        <button
                            onClick={() => showProfile(walker.id, walker.profile.type, walker.name, walker.birthday, walker.city, walker.description, walker.profile.phone, walker.review)}
                            className="btn btn-success">
                            Detail
                        </button>
                        <button
                            onClick={() => contactBtnClicked(walker.name)}
                            disabled={!walker.contactNumber}
                            className="btn btn-primary">
                            Contact
                        </button>
                    </div>
                }
            )
        })
    };
    //My Order List
    let orderInitial = [];
    if (client != undefined) {
        client.request.map((requests) => {
            orderInitial.push({
                id: requests._id,
                pay: requests.pay,
                walkerName: requests.walkerName,
                dogName: requests.dogName,
                deadline: {
                    from: requests.deadline.from,
                    to: requests.deadline.to,
                },
                budget: requests.budget,
                proposal: requests.proposal,
                status: requests.status,
                timestamp: requests.timestamp,
            })
        })
    }
    const orderList = {
        columns: [
            {
                label: 'Walker Name',
                field: 'walkerName',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Dog Name',
                field: 'dogName',
                sort: 'asc',
                width: 150
            },
            {
                label: 'From',
                field: 'from',
                sort: 'asc',
                width: 200
            },
            {
                label: 'To',
                field: 'to',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Budget',
                field: 'budget',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Proposal',
                field: 'proposal',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Edit',
                field: 'edit',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Pay',
                field: 'pay',
                sort: 'asc',
                width: 200
            },
        ],
        rows: orders.map((order) => {
            return (
                {
                    walkerName: order.walkerName,
                    dogName: order.dogName,
                    from: order.deadline.from.slice(0, 10),
                    to: order.deadline.to.slice(0, 10),
                    budget: order.budget,
                    proposal: order.proposal,
                    status: order.status,
                    edit: <div><button
                        // onClick={() => { cancelOrder(order.walkerName, client.name, order.dogName) }}
                        onClick={() => { cancelOrder(order.timestamp, order.walkerName) }}
                        className="btn btn-danger"
                        disabled={order.status !== "Posted" && order.status !== "Accepted"}>
                        Cancel
                    </button>
                        <button
                            onClick={() => {
                                setShowMessage(true);
                                setUpdateData({ walkerName: order.walkerName, timestamp: order.timestamp });
                                setEdit(true);
                                setFormData({
                                    dogName: order.dogName,
                                    from: order.deadline.from.slice(0, 10),
                                    to: order.deadline.to.slice(0, 10),
                                    budget: order.budget,
                                    proposal: order.proposal,
                                })
                            }}
                            className="btn btn-success"
                            disabled={order.status !== "Posted"}>
                            Update
                        </button>
                    </div>,
                    pay: <button
                        onClick={() => {
                            payOrder(order.walkerName, client.name, order.timestamp, order.budget);
                            setReviewFormData({ ...reviewFormData, walkerName: order.walkerName, ownerName: client.name });
                            setReview(true);
                        }}
                        className="btn btn-success"
                        disabled={order.status !== "Accepted"}>
                        Pay
                    </button>
                }
            )
        })
    };

    //account
    const accountData = orders.filter((order) => {
        if (order.status === "Done")
            return true
        else return false
    });
    const accountList = {
        columns: [
            {
                label: 'Budget',
                field: 'budget',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Walker Name',
                field: 'walkerName',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Dog Name',
                field: 'dogName',
                sort: 'asc',
                width: 150
            },
            {
                label: 'From',
                field: 'from',
                sort: 'asc',
                width: 200
            },
            {
                label: 'To',
                field: 'to',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Proposal',
                field: 'proposal',
                sort: 'asc',
                width: 200
            },
        ],
        rows: accountData.map((order) => {
            return (
                {
                    budget: order.budget,
                    walkerName: order.walkerName,
                    dogName: order.dogName,
                    from: order.deadline.from.slice(0, 10),
                    to: order.deadline.to.slice(0, 10),
                    proposal: order.proposal,
                }
            )
        })
    };
    const [ccview, setCCView] = useState(false);
    const [funds, setFunds] = useState(0);
    const [isAdd, setIsAdd] = useState(false);

    const initialCardForm = {
        holderName: '',
        cvv: '',
        cardNumber: '',
        year: '',
        month: '',
    }
    const [cardFormData, setCardFormData] = useState(initialCardForm);
    const {
        holderName,
        cvv,
        cardNumber,
        year,
        month,
    } = cardFormData
    const changeHandle = (e) => {
        setFunds(e.target.value);
    }
    const AddFunds = () => {
        setCCView(true);
        setIsAdd(true);
    }
    const Withdraw = () => {
        setCCView(true);
        setIsAdd(false);
    }
    const onchange = (e) => {
        setCardFormData({ ...cardFormData, [e.target.name]: e.target.value });
    }
    const FundHandler = (e) => {
        e.preventDefault();
        setCCView(false);
        addFunds(funds, isAdd)
        setCardFormData(initialCardForm);
    }
    // review
    const initialReviewForm = {
        walkerName: "",
        ownerName: "",
        communication: 0,
        professionalism: 0,
        workAgain: 0,
        reviewDet: ""
    }
    const [reviewFormData, setReviewFormData] = useState(initialReviewForm);
    const { walkerName, ownerName, communication, professionalism, workAgain, reviewDet, } = reviewFormData;
    const starHandler = (e) => {
        setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });
    }
    const reviewHandler = (e) => {
        e.preventDefault();
        reviewAction(reviewFormData);
        setReview(false);
        setReviewFormData(initialReviewForm);
    }


    return (
        <section className="walkerList">
            <div className='row positionSetter'>
                <div className='side col-md-3'>
                    <div onClick={() => setView(0)}>Dog Walker List</div>
                    <hr></hr>
                    <div onClick={() => setView(1)}>My Requests</div>
                    <hr></hr>
                    <span onClick={() => setView(2)}>My Account</span><sup className='text-white' style={{ backgroundColor: "red", padding: "2px", borderRadius: "10px" }}>{client && client.pay}</sup>
                </div>
                {view === 0 &&
                    <div className='main col-md-9'>
                        <div className='mainTable' style={{ filter: show || showMessage || contact || ccview ? "blur(1rem)" : "blur(0)" }}>
                            <h1 className="large text-primary">
                                Dog Walker List
                            </h1>
                            <MDBDataTable hover
                                striped
                                bordered
                                small
                                data={walkerList}
                            />
                            <form className="form my-2 d-flex justify-content" onSubmit={onSearch}>
                                <input
                                    className='search'
                                    type="number"
                                    placeholder="<10km"
                                    name="distance"
                                    value={distance}
                                    onChange={changeHandler}
                                />
                                <input type="submit" className="btn btn-primary" value="Search" />
                            </form>
                        </div>
                    </div>
                }
                {view === 1 &&
                    <div className="main col-md-9" style={{ filter: show || showMessage || contact || ccview || review ? "blur(1rem)" : "blur(0)" }}>
                        <MDBDataTable hover
                            striped
                            bordered
                            small
                            data={orderList}
                        />

                    </div>

                }
                <form onSubmit={reviewHandler}
                    style={{ display: review ? "block" : "none" }}
                    className="ownerReview"
                >
                    <h2>Please leave your feedback and rating for this dog-walker</h2>
                    <span className='btn btn-danger' onClick={() => setReview(false)}>X</span>
                    <div className="rating">
                        <div>
                            <input onChange={starHandler} type="radio" name="communication" value="5" id="c5" /><label htmlFor="c5">☆</label>
                            <input onChange={starHandler} type="radio" name="communication" value="4" id="c4" /><label htmlFor="c4">☆</label>
                            <input onChange={starHandler} type="radio" name="communication" value="3" id="c3" /><label htmlFor="c3">☆</label>
                            <input onChange={starHandler} type="radio" name="communication" value="2" id="c2" /><label htmlFor="c2">☆</label>
                            <input onChange={starHandler} type="radio" name="communication" value="1" id="c1" /><label htmlFor="c1">☆</label>
                        </div>
                        <p>Communication</p>
                    </div>

                    <hr />
                    <div className="rating">
                        <div>
                            <input onChange={starHandler} type="radio" name="professionalism" value="5" id="p5" /><label htmlFor="p5">☆</label>
                            <input onChange={starHandler} type="radio" name="professionalism" value="4" id="p4" /><label htmlFor="p4">☆</label>
                            <input onChange={starHandler} type="radio" name="professionalism" value="3" id="p3" /><label htmlFor="p3">☆</label>
                            <input onChange={starHandler} type="radio" name="professionalism" value="2" id="p2" /><label htmlFor="p2">☆</label>
                            <input onChange={starHandler} type="radio" name="professionalism" value="1" id="p1" /><label htmlFor="p1">☆</label>
                        </div>
                        <p>Professionalism</p>
                    </div>
                    <hr />
                    <div className="rating">
                        <div><input onChange={starHandler} type="radio" name="workAgain" value="5" id="w5" /><label htmlFor="w5">☆</label>
                            <input onChange={starHandler} type="radio" name="workAgain" value="4" id="w4" /><label htmlFor="w4">☆</label>
                            <input onChange={starHandler} type="radio" name="workAgain" value="3" id="w3" /><label htmlFor="w3">☆</label>
                            <input onChange={starHandler} type="radio" name="workAgain" value="2" id="w2" /><label htmlFor="w2">☆</label>
                            <input onChange={starHandler} type="radio" name="workAgain" value="1" id="w1" /><label htmlFor="w1">☆</label>
                        </div>
                        <p>Would you like work with this owner again?</p>
                    </div>
                    <hr />
                    <h3>Comments</h3>
                    <div className="form-group">
                        <textarea
                            placeholder="Write your proposal here."
                            name="reviewDet"
                            value={reviewDet}
                            onChange={starHandler}
                        />
                    </div>
                    <input type="submit" className='btn btn-success' />
                </form>
                {view === 2 &&
                    <div className='accountList col-md-9' style={{ filter: show || showMessage || contact || ccview ? "blur(1rem)" : "blur(0)" }}>
                        <MDBDataTable hover
                            striped
                            bordered
                            small
                            data={accountList}
                        />
                        <div>
                            <input
                                className='fund'
                                type="number"
                                placeholder="1000$"
                                name="fund"
                                value={funds}
                                onChange={changeHandle}
                            />
                            <button className='add btn btn-success' onClick={AddFunds}>ADD</button>
                            <button className='withdraw btn btn-danger' onClick={Withdraw}>Withdraw</button>
                        </div>
                    </div>
                }
                {ccview &&
                    <form className='form ccview' onSubmit={FundHandler}>
                        <span className="btn btn-danger" onClick={() => setCCView(false)}>X</span>
                        <div className='row '>
                            <div className="form-group col-md-8">
                                <label htmlFor='ownerName'>Holder Name</label>
                                <input
                                    id='ownerName'
                                    required
                                    type="text"
                                    name="holderName"
                                    value={holderName}
                                    onChange={onchange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor='cvv'>CVV</label>
                                <input
                                    id='cvv'
                                    required
                                    type="number"
                                    name="cvv"
                                    value={cvv}
                                    onChange={onchange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor='cardNumber'>Card Number</label>
                            <input
                                id='cardNumber'
                                required
                                type="number"
                                name="cardNumber"
                                value={cardNumber}
                                onChange={onchange}
                            />
                        </div>
                        <div className="form-group row">
                            <label>Expiration Date</label>
                            <div className='col-md-3'>
                                <select value={month} onChange={onchange}>
                                    <option value="01">January</option>
                                    <option value="02">February </option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div className='col-md-3'>
                                <select value={year} onChange={onchange}>
                                    <option value="16"> 2016</option>
                                    <option value="17"> 2017</option>
                                    <option value="18"> 2018</option>
                                    <option value="19"> 2019</option>
                                    <option value="20"> 2020</option>
                                    <option value="21"> 2021</option>
                                    <option value="22"> 2022</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary col-md-5">Confirm</button>
                        </div>
                    </form>
                }

                <div className='walkerProfile' style={{ display: show ? "block" : "none" }}>
                    <h2>Walkers Profile</h2>
                    <span className='btn btn-danger' onClick={() => setShow(false)}>X</span>
                    <br />
                    <div className='detail row'>
                        <div className='col-md-6'>Name:</div>
                        <div className='col-md-6'>{profileData.name}</div>
                        <div className='col-md-6'>Ranking:</div>
                        <div className='col-md-6 ratingView'>{ranking}</div>

                        {/* <div className="rating col-md-6">
                            <div>
                                <input  type="radio" name="communication" value="5" id="zz5" /><label htmlFor="zz5">☆</label>
                                <input checked={avr_rating === "4"} type="radio" name="communication" value="4" id="zz4" /><label htmlFor="zz4">☆</label>
                                <input  type="radio" name="communication" value="3" id="zz3" /><label htmlFor="zz3">☆</label>
                                <input  type="radio" name="communication" value="2" id="zz2" /><label htmlFor="zz2">☆</label>
                                <input  type="radio" name="communication" value="1" id="zz1" /><label htmlFor="zz1">☆</label>
                            </div>
                        </div> */}
                        <div className='col-md-6'>Level:</div>
                        <div className='col-md-6'>{profileData.type}</div>
                        <div className='col-md-6'>Birthday:</div>
                        <div className='col-md-6'>{profileData.birthday}</div>
                        <div className='col-md-6'>City:</div>
                        <div className='col-md-6'>{profileData.city}</div>
                        <div className='col-md-6'>Description:</div>
                        <div className='col-md-6'>{profileData.description}</div>
                        <div className='col-md-6'>Phone:</div>
                        <div className='col-md-6'>{profileData.phone}</div>
                    </div>
                </div>
                <div className='sendOrder' style={{ display: showMessage ? "block" : "none" }}>
                    <h2>Send Order</h2>
                    <span className='btn btn-danger' onClick={() => setShowMessage(false)}>X</span>
                    <br />
                    <div className='detail row'>
                        <form className="form" onSubmit={onSubmit}>

                            <div className="form-group">
                                <select
                                    name="dogName"
                                    value={dogName}
                                    onChange={onChange}
                                >
                                    <option value="none">Please select your dog</option>
                                    {dogList}
                                </select>
                            </div>
                            <div className="form-group">
                                <small>From</small>
                                <input
                                    className='deadline'
                                    type="date"
                                    name="from"
                                    value={from}
                                    onChange={onChange}
                                />
                                <small>To</small>
                                <input
                                    className='deadline'
                                    type="date"
                                    name="to"
                                    value={to}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    placeholder="500$"
                                    name="budget"
                                    value={budget}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Write your proposal here."
                                    name="proposal"
                                    value={proposal}
                                    onChange={onChange}
                                />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Request" />
                        </form>

                    </div>
                </div>

                <div className='sendMessage' style={{ display: contact ? "block" : "none" }}>
                    <h2>Send Message</h2>
                    <span className='btn btn-danger' onClick={() => setContact(false)}>X</span>
                    <div className='content'>
                        <div className='show' style={{ backgroundColor: "white", overflowY: "scroll" }}>
                            {messageContent}
                        </div>
                        <div className='send'>
                            <form className="form" onSubmit={MessageToAction}>
                                <div className="form-group">
                                    <textarea
                                        className='message'
                                        name="message"
                                        value={message}
                                        onChange={messageInput}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Send" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};


export default connect(null, { createOrder, cancelOrder, payOrder, addFunds, messages, getMessage, reviewAction })(
    DogWalkerList
);
