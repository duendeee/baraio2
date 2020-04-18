import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import RoomService from '../services/RoomService';


const ModalCreateRoom = () => {
    const initialRoomState = {
        nome: "",
        max_players: "",
        ativo: "true"
    };

    const [room, setRoom] = useState(initialRoomState)
    const [submitted, setSubmitted] = useState(false);
    const [toggle, setToggle] = useState(false);


    const handleInputChange = event => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    const saveRoom = () => {
        var data = {
            nome: room.nome,
            max_players: room.max_players,
            ativo: room.ativo
        };

        RoomService.create(data)
        .then(response => {
            setRoom({
                nome: response.data.nome,
                max_players: response.data.max_players,
                ativo: true
            })
        })
        .catch(e => {
            console.log(e)
        })
        setSubmitted(true);
        setToggle(!toggle)
    }


    return (
        <MDBContainer>
        <MDBBtn color="blue" onClick={() => setToggle(!toggle)}>Criar Sala</MDBBtn>
        {submitted ? (
            <div>
          <h6>Sala "{room.nome.toUpperCase()}" 
          com capacidade para{room.max_player} criada com sucesso!</h6>

        </div>
        ) : (
            <MDBModal isOpen={toggle}>
                <MDBModalHeader>Criar nova sala</MDBModalHeader>

                <MDBModalBody>
                    <div className="form-group">
                        <label htmlFor="title">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={room.nome}
                            onChange={handleInputChange}
                            name="nome"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Max. Players</label>
                        <input
                            type="number"
                            className="form-control"
                            required
                            value={room.max_players}
                            onChange={handleInputChange}
                            name="max_players"
                        />
                    </div>
                </MDBModalBody>

                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={saveRoom}>
                        Criar
                </MDBBtn>
                </MDBModalFooter>

            </MDBModal>
            )}
        </MDBContainer>
    )
}

export default ModalCreateRoom;
