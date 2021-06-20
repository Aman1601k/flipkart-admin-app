import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory , deleteCategoriesAction, getAllCategory, updateCategories } from "../../actions";
import Layout from "../../components/Layout";
import NewModal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
  IoCheckboxOutline,
  IoCheckboxSharp,
  IoArrowDownSharp,
  IoArrowForwardSharp,
  IoAddOutline,
  IoTrashBinSharp,
  IoCloudUploadSharp
} from "react-icons/io5";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/updateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import './style.css';

const Category = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [deleteCategoryModal , setDeleteCategoryModal] = useState(false);

  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {

    if(!category.loading){
      setShow(false);
    }

  },[category.loading])

  const handleClose = () => {
    const form = new FormData();

    if(categoryName === ""){
      alert('Category name is required');
      return;
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children: category.children.length > 0 && renderCategories(category.children),
      });
      console.log(category.children)
      }
      
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      });
      if(category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
      setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
      setCheckedArray(checkedArray);
      setExpandedArray(expandedArray);
  }

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories()
    setDeleteCategoryModal(true)
  }

  const handleCategoryInput = (key , value , index, type) => {
    if(type == 'checked'){
        const updatedCheckedArray = checkedArray.map((item , _index) => index == _index ? { ...item , [key] : value} : item);
        setCheckedArray(updatedCheckedArray)
    }else if(type == 'expanded'){
      const updatedExpandedArray = expandedArray.map((item , _index) => index == _index ? { ...item , [key] : value} : item);
      setExpandedArray(updatedExpandedArray)
    }
  }

  const updateCategoriesForm = () => {

    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type );
    })
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type );
    })

    dispatch(updateCategories(form));

  }

  const deleteCategoriesYes = () => {
    const checkedIdsArray = checkedArray.map((item , index) => ({_id: item.value}))
    const expandedIdsArray = expandedArray.map((item , index) => ({_id: item.value}))
    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if(checkedIdsArray.length > 0){
       dispatch(deleteCategoriesAction(checkedIdsArray))
    .then(result => {
      if(result){
        dispatch(getAllCategory())
        setDeleteCategoryModal(false);
      }
    });
    }
    setDeleteCategoryModal(false);
  }

  const renderDeleteCategoryModal = () => {
    return (
      <NewModal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label:'No',
            color: 'primary',
            onClick:() =>{
              alert('no')
            }
          },
          {
            label:'Yes',
            color: 'danger',
            onClick:deleteCategoriesYes
          }

        ]}
      >
          <h5>Expanded</h5>
          {expandedArray.map( (item , index) => <span key={index}>{item.name}</span>)}
          <h5>Checked</h5>
          {checkedArray.map( (item , index) => <span key={index}>{item.name}</span>)}
      </NewModal>
    )
  }

  const categoryList = createCategoryList(category.categories);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions :</span>
                <button onClick={handleShow}><IoAddOutline/><span>Add</span></button>
                <button onClick={deleteCategory}><IoTrashBinSharp/><span>Delete</span></button>
                <button onClick={updateCategory}><IoCloudUploadSharp/><span>Edit</span></button>
              </div>
              
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckboxSharp />,
                uncheck: <IoCheckboxOutline />,
                halfCheck: <IoCheckboxOutline />,
                expandClose: <IoArrowForwardSharp />,
                expandOpen: <IoArrowDownSharp />,
              }}
            />
          </Col>
        </Row>
      </Container>

      {/* -------------------------------------------------------------Add categories Modal---------------------------------------------------------------------------- */}

      <AddCategoryModal
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={handleClose}
      modalTitle={"Add New Category"}
      categoryName={categoryName}
      setCategoryName={setCategoryName}
      parentCategoryId={parentCategoryId}
      setParentCategoryId={setParentCategoryId}
      categoryList={categoryList}
      handleCategoryImage={handleCategoryImage}
      />

      {/* -------------------------------------------------------------Edit categories Modal---------------------------------------------------------------------------- */}

      <UpdateCategoriesModal
      show={updateCategoryModal}
      handleClose={() => setUpdateCategoryModal(false)}
      onSubmit={updateCategoriesForm}
      modalTitle={"Update Category"}
      size="lg"
      expandedArray={expandedArray}
      checkedArray={checkedArray}
      handleCategoryInput={handleCategoryInput}
      categoryList={categoryList}
      />

       {/* -------------------------------------------------------------Delete categories Modal---------------------------------------------------------------------------- */}
      
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
