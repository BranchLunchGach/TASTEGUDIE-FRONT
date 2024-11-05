import React from "react";
import styled from "styled-components";
import "./Category.css";
import { Link } from "react-router-dom";

const StyledCategory = styled.ul`
  width: 550px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  list-style: none;
  margin-right: 30px;
  float: right;
`;

const Category = ({ scrollToPage }) => {
  return (
    <StyledCategory className="category">
      <li>
        <Link to="/menu">
          <button className="yellow" id="menu">
            MENU
          </button>
        </Link>
      </li>
      <li>
        <Link to="/course">
          <button className="black" id="course">
            COURSE
          </button>
        </Link>
      </li>
      <li>
        <Link to="/sign-in">
          <button className="yellow" id="sign-in">
            SIGN IN
          </button>
        </Link>
      </li>
    </StyledCategory>
  );
};

export default Category;
