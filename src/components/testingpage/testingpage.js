import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as mutations from "../../store/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import { CommentsList } from '../commentlist/commentlist';
import * as constants from '../../store/constants';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../../logo.svg';

export const TestingPage = (props) => {

  const task = {
    id: '109asdijfaasLSKDJFL34',
    name: 'Test Task',
    group: constants.GROUP_ID.TODO,
    owner: 'U1',
    isComplete: false
  }
  const testComments = [
    {
      id: 'C1',
      task: task.id,
      commenter: 'Test',
      date: new Date(),
      content: 'This is a test of the emergency brodcast system. This is only a test.'
    },
    {
      id: 'C2',
      task: task.id,
      commenter: 'Emergency',
      date: new Date('08/15/1988'),
      content: 'This is not a test There is a real emergency.'
    }
  ];

  const handleDeleteComment = (id) => {
    const newList = testComments.filter(c => c.id !== id);
    console.log('handleDelete: Delete id: ', id,
      'Success: ', newList.length < testComments.length,
      'B: ', testComments.length,
      'A: ', newList.length);
    return newList;
  }

  const handleEditComment = (comment) => {
    const old = testComments.find(c => c.id == comment.id);
    const i = testComments.findIndex(c => comment.id == c.id);
    testComments[i] = comment;
    console.log('handleEdit: CommentId: ', comment.id,
      'O:', old,
      'N:', testComments[i])
  }

  const handleAddComment = (comment) => {
    const id = (Math.random() * 10000).toFixed(0);
    comment.id = id;
    console.log('B: ', testComments);
    testComments.push(comment);
    console.log('A: ', testComments);
  }

  const logOut = () => {};

  return (
    <div className="col-12">
      <div className='test-block'>  
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              alt="spinner"
              width="30"
              height="30"
              className="nav-logo d-inline-block align-top"
            />
            Dice Roller
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav as='ul' className="mr-auto">
            { !true ? //isAuthenticated  
              <Nav.Item as='li'>
                <Link className='nav-link' to="/login">
                  Login
                </Link>
              </Nav.Item> :
              <Nav.Item as='li'>
                <button className="btn btn-outline-primary" onClick={logOut}>
                  <FontAwesomeIcon icon={faLock} />  Log Out
                </button>
              </Nav.Item>
            }
            <Nav.Item as='li'>
            <Link className='nav-link' to="/dashboard">
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item as='li'>
            <Link className='nav-link' to='/test'>
                Component Tests
              </Link>
            </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className='test-block'>

        <h2 className="text-center">Component Testing Grounds</h2>
        <div className="m-auto w-75">
          <CommentsList comments={testComments}
            taskId={task.id}
          />
        </div>
      </div>
    </div>
  )
}

