import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import { MDBContainer, MDBBtn } from "mdbreact";
import io from "socket.io-client";
import ModalUsersOnline from './ModalUsersOnline';
import RoomsList from './components/Room/RoomsList';
import RoomCreateUpdate from './components/Room/RoomCreateUpdate';


export const socket = io("http://localhost:8080");


const User = () => {
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
            console.log(isSeted)
        } else {
            console.log('nao pode nick vazio!')
            console.log(isSeted)
        }
    }


    return (
        <MDBContainer className="p-5">

            {isSeted &&

                <div>
                    <h3 className="text-center">Bem-vindo ao FODINHA Online!</h3>
                    <ModalUsersOnline
                        data={listUser}
                    >
                    </ModalUsersOnline>

                    <div className="content">
                        <RoomsList />
                    </div>

                    <Route path="/room/:pk"  component={RoomCreateUpdate} />
                    <Route path="/room/" exact component={RoomCreateUpdate} />
                </div>

            }


            {!isSeted &&

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


export default User;

