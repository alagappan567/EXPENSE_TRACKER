import React, { useState } from "react";
import AddCategoryUI from "./AddCategoryUI";
import { addCategoryApi } from "../../../apis/category.api";
import { callApiAction } from "../../../store/actions/commonAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/actions/modalAction";

const AddCategoryController = ({ fetchList }) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        err: '',
        name: '',
        icon: '',
    }) // Set your default emoji here
    const defaultEmoji = "😀";
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEmojiClick = (emojiObject, event) => {
        setChosenEmoji(emojiObject);
        setFormValues({ ...formValues, icon: emojiObject.emoji })
        console.log(formValues)
        setShowPicker(false); // Hide the emoji picker after selecting an emoji
    };

    const handleEmojiButtonClick = () => {
        setShowPicker(true); // Show the emoji picker on button click
    };

    const addCategory = async (formValues) => {
        console.log(formValues);
        setLoading(true);
        dispatch(callApiAction(
            async () => await addCategoryApi({ ...formValues, ...chosenEmoji }),
            (response) => {
                dispatch(closeModal());
                setLoading(false);
                fetchList();
            },
            (err) => {
                setFormValues({ ...formValues, err: err })
                console.log(err)
                setLoading(false)
            }
        ))
    }
    return (
        <>
            <AddCategoryUI loading={loading} formValues={formValues} setFormValues={setFormValues} handleEmojiButtonClick={handleEmojiButtonClick} handleEmojiClick={handleEmojiClick} chosenEmoji={chosenEmoji} showPicker={showPicker} defaultEmoji={defaultEmoji} addCategory={addCategory} />
        </>
    )
}

export default AddCategoryController;