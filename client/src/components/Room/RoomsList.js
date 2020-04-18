import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBContainer, MDBRow, MDBIcon } from 'mdbreact';
import RoomService from '../services/RoomService';
import GameRoom from './GameRoom';
//import { useHistory } from 'react-router-dom';

const RoomsList = params => {
    //const history = useHistory();
    const [rooms, setRooms] = useState([]);
    const socket = params.socket

    useEffect(() => {
        const handleJoinRoom = (data) => {
            params.updateInRoom(false)   
            console.log(data)         
        }

        socket.on('ola', handleJoinRoom)

        retrieveRooms()
    }, []);
    

    const retrieveRooms = () => {
        RoomService.getAll()
            .then(response => {
                setRooms(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (

        <div className="list row" style={{ paddingTop: '20px' }}>
         
            <div className="col-md-12 align-items-center justify-content-center">
                <h4 className="text-center">Lista de Salas</h4>

                
                {/* <MDBTable>
                    <MDBTableHead color="primary-color" textWhite>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Max. Players</th>
                            <th>Criado em</th>
                            <th>Ativo</th>
                        </tr>
                    </MDBTableHead>

                    <MDBTableBody>
                        {!rooms.data || rooms.data.length <= 0 ? (
                            <tr>
                                <td colSpan="6" align="center">
                                    <b>Opaaa, não temos nenhuma sala criado até o momento!</b>
                                </td>
                            </tr>
                        ) : (
                                rooms.data.map(room => (
                                    <tr key={room.pk}>
                                        <td>{room.pk}</td>
                                        <td>{room.nome}</td>
                                        <td>{room.max_players}</td>
                                        <td>{room.criado_em}</td>
                                        <td>
                                            
                                            <MDBBtn
                                                color="light-green"
                                                className="pl-5 pr-5 pt-1 pb-1 m-0"
                                                onClick={() => {
                                                    const roomName = room.nome
                                                    console.log('Entrando na room: ', roomName)
                                                    socket.emit('joinRoom', roomName)
                                                    //history.push(`gameroom/${room.nome}`);
                                                }}
                                            >
                                                entrar 
                                            </MDBBtn>

                                        </td>
                                    </tr>
                                ))
                            )}
                    </MDBTableBody>
                </MDBTable> */}

                {!rooms.data || rooms.data.length <= 0 ? (<span>dsds</span>) : (
                    <MDBContainer>
                        <MDBRow>
                            {rooms.data.map(room => (
                                <MDBCol md="3" className="mb-5">
                                    <MDBCard style={{ width: "11rem" }} key={room.pk}>
                                        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                                        <MDBCardBody>
                                        <MDBCardText className="text-left"><b>{room.pk}</b></MDBCardText>
                                        <MDBCardText className="text-right"><MDBIcon icon="users"/> 0/{room.max_players}</MDBCardText>                            
                                        <MDBBtn color="light-green" className="btn btn-primary">Entrar</MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </MDBContainer>
                )}

            </div>
        </div>
    );

};


export default RoomsList;