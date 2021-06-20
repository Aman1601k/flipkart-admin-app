import React from "react";
import Input from "../../../components/UI/Input";
import NewModal from "../../../components/UI/Modal";

import { Col, Container, Row } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    handleClose,
    modalTitle,
    show,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit
  } = props;

  return (
    <NewModal show={show} handleClose={handleClose} modalTitle={modalTitle} onSubmit={onSubmit}>
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Col>
        <Col>
        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Select category</option>
          {categoryList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        </Col>
      </Row>
      <Row>
          <Col>
            <input type="file" name="categoryImage" onChange={handleCategoryImage} />
          </Col>
      </Row>

    </NewModal>
  );
};

export default AddCategoryModal;
