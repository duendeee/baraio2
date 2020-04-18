import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from "mdbreact";

import ModalUsersOnline from './ModalUsersOnline';
import RoomsList from './components/Room/RoomsList';
import ModalCreateRoom from './components/Room/ModalCreateRoom';
import GameRoom from './components/Room/GameRoom';

import io from "socket.io-client";
export const socket = io("http://localhost:8080");


const Home = props => {
    const [userName, setUserName] = useState('')
    const [listUser, updateListUsers] = useState([])
    const [isSeted, updateIsSeted] = useState(false)

    useEffect(() => {
        const handleNewUserName = newUserName => {
            updateListUsers(listUser => [...listUser, newUserName])
        }

        if (isSeted) {
            socket.on('setUser', handleNewUserName)
        }

        return () => {
            if (isSeted) {
                socket.off('setUser', handleNewUserName)
            }
        }
    }, [listUser, isSeted])


    const handleIsSeted = () => {
        isSeted
            ? updateIsSeted(false)
            : updateIsSeted(true);
    }

    const handleInputChange = event =>
        setUserName(event.target.value)

    const submitUserName = () => {
        if (userName.trim()) {
            socket.emit('setUser', userName)
            setUserName('')
            handleIsSeted()
            return userName

        } else {
            console.log('nao pode nick vazio!')
        }
    }

    //Join Room
    const [notInRoom, updateInRoom] = useState(true)

    return (
        <MDBContainer className="p-5">


            {notInRoom && isSeted &&
                <div>
                    <div>
                        <h3 className="text-center">Bem-vindo ao FODINHA Online!</h3>
                        <MDBRow>

                            <MDBCol>
                                <ModalUsersOnline
                                    className="align-content-end"
                                    data={listUser}
                                >
                                </ModalUsersOnline>
                            </MDBCol>

                            <MDBCol>
                                <ModalCreateRoom />
                            </MDBCol>

                        </MDBRow>
                    </div>

                    <div className="content">
                        <RoomsList {...props} socket={socket} updateInRoom={updateInRoom} />

                    </div>

                    <div>
                        <GameRoom socket={socket} />
                    </div>
                </div>
            }


            {notInRoom && !isSeted &&

                <div>
                    <h2 className="text-center">Escolha um nickname para jogar!</h2>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"></i>
                            </span>
                        </div>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon"
                            value={userName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="h-25 w-responsive text-center mx-auto p-2">
                        <MDBBtn color="blue" onClick={submitUserName}>Entrar</MDBBtn>
                    </div>

                </div>

            }

        </MDBContainer>
    )
}


export default Home;

