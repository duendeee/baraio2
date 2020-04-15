import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalUsersOnline extends Component {
    state = {
        modal: false
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <MDBContainer>
                <MDBBtn color="green" onClick={this.toggle}>Usuários Online</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}><strong>Usuários Online</strong></MDBModalHeader>
                    <MDBModalBody>
                    <ul className="list pt-3">
                    {this.props.data.map((user, idx) => (
                        <li key={idx}>
                            <span>
                                Nickname: { user }<br/>
                            </span>
                        </li>
                    ))}
                </ul>
                        
        </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.toggle}>OK</MDBBtn>

                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalUsersOnline;