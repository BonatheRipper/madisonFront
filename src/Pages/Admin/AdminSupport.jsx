import React, { useState, useEffect } from "react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { CgArrowLongLeft } from "react-icons/cg";
import AdminSharedHeader from "./Components/AdminSharedHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/Statecontext";
/// This function sets the time in in minutes, days, hours, months , years ago format.
function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return " now";

    return `started ~ ${Math.round(elapsed / 1000)} seconds ago`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  } else if (elapsed < msPerDay) {
    return `started ~ ${Math.round(elapsed / msPerHour)} hours ago`;
  } else if (elapsed < msPerMonth) {
    return `started ~ ${Math.round(elapsed / msPerDay)} days ago`;
  } else if (elapsed < msPerYear) {
    return `started ~ ${Math.round(elapsed / msPerMonth)} months ago`;
  } else {
    return `started ~ ${Math.round(elapsed / msPerYear)} years ago`;
  }
}
//This fucntion sets the chats date my months format
function getDateByMonths(date) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var d = new Date(date);
  return months[d.getMonth()] + " " + String(d.getDate()).padStart(2, "0");
}
// This function sorts the chats message by date posted
function sortDateChatsByDate(array) {
  return array.sort(function (a, b) {
    var dateA = new Date(a.time),
      dateB = new Date(b.time);
    return dateA - dateB;
  });
}
const AdminSupport = () => {
  const screenSize = 1000;
  const navheight = 220;
  const [chatMenu, SetchatMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const { themeBG, user } = useStateContext();
  let textInput = React.createRef();

  useEffect(() => {
    const fetchMessages = async () => {
      //we fetch all messages from server, we set chatbox to first message
      try {
        const messages = await axios.get("/api/support/message", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setMessages(messages.data);
        setChats(messages.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMessages();
  }, []);

  // on click of any chat we get the chat from server and setCurrent chatbox to it.
  const HandleChatState = async (messageId) => {
    try {
      const messages = await axios.get(`/api/support/message/${messageId}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setChats(messages.data);
      SetchatMenu(!chatMenu);
    } catch (e) {
      console.log(e);
      toast.error("There was an error");
    }
  };

  //we set meessage preview to last message user sent
  const lastMessageFromUser = (chats) => {
    for (let chat of chats.reverse()) {
      if (!chat.isAdmin) {
        return chat;
      }
    }
  };
  //show or hide chatBox mobile
  const toggleChatPane = () => {
    SetchatMenu(!chatMenu);
  };

  //send admin reply to server, then update chat aftwerwards
  const handAdminReply = async (messageId) => {
    let text = textInput.current.value;

    try {
      const messages = await axios.post(
        `/api/support/message/admin/${messageId}`,
        { text, headers: { authorization: `Bearer ${user.token}` } }
      );
      toast(messages.data.success);
      setChats(messages.data.chat);
      setSearchterm("");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="">
      <AdminSharedHeader />
      {/* <h1 className='text-3xl p-4'>Support</h1> */}
      <div
        className={`flex justify-between h-full relative bg-[#F1FFFD]   text-c-gold`}
      >
        <div
          className={`${
            chatMenu ? "-left-full w-0" : "w-full left-0 "
          }  z-20   h-screen   lg:w-3/12  fixed  ${themeBG} my-4 pt-12`}
        >
          <div className="search flex flex-row items-center py-3">
            <div className="userImg px-1">
              <img
                src="https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
                alt="Profilepic"
                className="w-11 h-11 rounded-full"
              />
            </div>
            <div className="userImg px-2 relative flex items-center  ">
              <BsSearch className="absolute ml-2  " />
              <input
                type="text"
                onChange={(e) => setSearchterm(e.target.value)}
                placeholder="search names"
                className={` ${themeBG} border border-c-gold w-10/12 active:border-none px-10  py-1  rounded-md`}
              />
            </div>
          </div>

          {/* // Filtering messages functions*/}

          {messages.length !== 0 && (
            <>
              {messages
                .filter((val) => {
                  //If the query search to filter is emty return all

                  if (searchterm === "") {
                    return val;
                  } else if (
                    //Else return the filtered
                    val.name.toLowerCase().includes(searchterm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((message) => {
                  return (
                    <div
                      id="RecentChats"
                      key={message._id}
                      onClick={() => HandleChatState(message._id)}
                      className={` flex flex-row my-2 items-center py-1 border-b border-c-gold`}
                    >
                      <div className="userImg p-1 items-center flex flex-row w-full relative">
                        <div className="flex relative  px-1">
                          <img
                            src="https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
                            alt="Profilepic"
                            className="w-11 h-11 rounded-full "
                          />
                          <RiCheckboxBlankCircleFill className="w-2 h-2 absolute mt-1 text-green-500 " />
                        </div>
                        <div className=" flex flex-row px-2 items-center justify-between  w-full">
                          <div className="flex flex-col w-full text-left  ">
                            <small className="bold text-gray-500">
                              {message.name}
                            </small>
                            <small className="">
                              {lastMessageFromUser(message.messages).message}
                            </small>
                          </div>
                          <div className="lastSeeen text-right w-11/12">
                            <small
                              style={{ fontSize: "10px" }}
                              className="px-5 w-full"
                            >
                              {timeDifference(
                                new Date(),
                                new Date(
                                  lastMessageFromUser(message.messages).time
                                )
                              )}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          {/* //THIS IS WHERE I SHOULD MAP USERS ENDS*/}
          {/* //THIS IS WHERE I SHOULD MAP USERS ENDS*/}
          {/* //THIS IS WHERE I SHOULD MAP USERS ENDS*/}
        </div>
        <div
          id="CurrentUserChat"
          className={`${
            chatMenu ? "inline" : " md:w-9/12 "
          } right-0    w-full h-full text-c-green absolute pt-12`}
        >
          {chats && (
            <>
              <div className=" border-b shadow-lg flex flex-row items-center justify-between py-3  sticky top-0 w-full   text-c-green z-10">
                <div className="userImg p-1 items-center flex flex-row w-full relative ">
                  <div
                    className={`toggleChatPane px-2  mt-4 ${
                      chatMenu ? "inline" : "false"
                    }`}
                  >
                    <button
                      onClick={() => toggleChatPane()}
                      type="button"
                      className="h-5 w-18"
                    >
                      <CgArrowLongLeft className="h-5 w-18" />
                    </button>
                  </div>
                  <div className="flex relative  p-1">
                    <img
                      src="https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
                      alt="Profilepic"
                      className="w-11 h-11 p-1 rounded-full "
                    />
                    <RiCheckboxBlankCircleFill className="w-2 h-2 absolute mt-1 " />
                  </div>

                  <div className="px-1 flex flex-col mx-1 items-start ">
                    <small className="bold">{chats.name}</small>
                    <small>
                      Last message{" "}
                      <span>
                        {timeDifference(
                          new Date(),
                          new Date(lastMessageFromUser(chats.messages).time)
                        )}
                      </span>
                    </small>
                  </div>
                </div>
                <div className="userImg p-1 relative ">
                  <BsThreeDotsVertical className="p-1 w-7 h-7" />
                </div>
              </div>
              <div className="py-6  h-full flex flex-col items-center  w-full  grow top-24 z-0 text-center">
                {sortDateChatsByDate(chats.messages).map((chat, i) => {
                  return (
                    <div
                      key={chat._id}
                      id={!chat.isAdmin ? "UserChats" : "AdminChats"}
                      className="  w-full h-auto pb-10"
                    >
                      {/* Using tenary operator to check date of chat, if date of chat not equals previous date, display the date, else, ignore */}
                      {sortDateChatsByDate(chats.messages)[i - 1] ? (
                        getDateByMonths(
                          sortDateChatsByDate(chats.messages)[i].time
                        ) !==
                        getDateByMonths(
                          sortDateChatsByDate(chats.messages)[i - 1].time
                        ) ? (
                          <div className="  w-full h-5  text-center flex ">
                            <small className="text-xs items-center w-full bold ">
                              {getDateByMonths(chat.time)}
                            </small>
                          </div>
                        ) : (
                          console.log("No")
                        )
                      ) : (
                        <div className="  w-full h-5  text-center flex ">
                          <small className="text-xs items-center w-full bold ">
                            {getDateByMonths(chat.time)}
                          </small>
                        </div>
                      )}

                      {!chat.isAdmin ? (
                        <div
                          className={`${
                            !chat.isAdmin
                              ? "justify-start items-left "
                              : " justify-end items-right "
                          } chatDdate  p-3 flex  relative bg-green h-auto`}
                        >
                          <div
                            className={`${
                              !chat.isAdmin
                                ? "messages justify-start text-left w-11/12 items-left flex-col mr-4  text-xs md:text-sm flex  h-auto break-all "
                                : " messages text-xs md:text-sm  flex h-auto break-all flex-col p-2 items-left justify-start text-right w-11/12"
                            } chatDdate  p-3 flex  relative bg-green h-auto`}
                          >
                            <div className="p-2 ">
                              <span className="bg-[#e0eeff] p-1 px-3 rounded-lg">
                                {chat.message}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={` chatDdate  p-3 flex  relative bg-green h-auto`}
                        >
                          <div
                            className={`${
                              !chat.isAdmin
                                ? ""
                                : "  break-all flex-col p-2 items-left justify-start text-right w-11/12"
                            } chatDdate  p-3 flex  relative bg-green h-auto messages text-xs md:text-sm `}
                          >
                            <div className="p-2 ">
                              <span className="bg-[#def7fd] p-1 px-3 rounded-lg">
                                {chat.message}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className=" flex flex-row items-center     h-20 fixed w-full  z-10 -bottom-4">
                <div className="messag   w-full relative flex items-center ">
                  <input
                    type="text"
                    // value={text}
                    // onChange={(e) => setSearchterm(e.target.value)}
                    ref={textInput}
                    placeholder="  Hello my name is Max"
                    className="rounded-lg  border border-c-gold w-full  py-2 m-0"
                  />
                  <button
                    onClick={() => handAdminReply(chats._id)}
                    className="rounded-lg text-c-gold  border border-c-gold absolute px-4  py-2 bg-black right-0"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
          {/*  CHAT INPUT BOX STTARTS ENDS*/}
          {/*  CHAT INPUT BOX STTARTS ENDS*/}
          {/*  CHAT INPUT BOX STTARTS ENDS*/}
        </div>
      </div>
    </div>
  );
};

export default AdminSupport;
