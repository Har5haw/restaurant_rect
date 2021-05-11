import { Box, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import TableComp from "../../molecules/Table";
import SearchBar from "../../atoms/SeachBar/index";
import PopUpMolecule from "../../molecules/PopUp";
import {
    addItemToTable,
    changeServings,
    deleteItem,
} from "../../../features/tableList/index";
import { useDispatch, useSelector } from "react-redux";
import { changeData, closePopup } from "../../../features/popupData/index";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "93vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: theme.palette.type === "dark" ? "grey" : "lightblue",
    },
    input: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(51, 63, 62)",
    },
    inputField: {
        width: "25vw",
        margin: "20px 0px",
        marginTop: "0px",
        height: "40px",
        background: theme.palette.type === "dark" ? "transparent" : "white",
    },
    list: {
        height: "calc(90vh - 60px)",
        overflowY: "auto",
    },
}));

const TablesList = () => {
    const tableData = useSelector((state) => state.tableList);

    const [searchBarText, setSearchBarText] = useState("");

    const popupData = useSelector((state) => state.popupData);

    const itemsData = useSelector((state) => state.itemsList);

    const dispatch = useDispatch();

    const style = useStyles();

    let timer;

    const handleKeyUp = (event) => {
        clearTimeout(timer);
        timer = setTimeout(
            doneTypingTableSearchBar.bind(null, event.target.value),
            400
        );
    };

    const doneTypingTableSearchBar = (searchText) => {
        setSearchBarText(searchText);
    };

    const click = (index) => {
        dispatch(
            changeData({
                tableIndex: index,
            })
        );
    };

    const allowDrop = (event) => {
        event.preventDefault();
    };

    const drop = (event, index) => {
        event.preventDefault();
        dispatch(
            addItemToTable({
                index: index,
                itemData: itemsData.filter(
                    (ele) =>
                        ele.id ===
                        parseInt(event.dataTransfer.getData("itemId"))
                )[0],
            })
        );
    };

    const onServingsChange = (event, itemIndex) => {
        dispatch(
            changeServings({
                servings: event.target.value,
                itemIndex: itemIndex,
                tableIndex: popupData.tableIndex,
            })
        );
    };

    const onDelete = (itemIndex) => {
        dispatch(
            deleteItem({
                itemIndex: itemIndex,
                tableIndex: popupData.tableIndex,
            })
        );
    };

    return (
        <Box className={style.root}>
            <Box className={style.input}>
                <SearchBar
                    placeholder="Search by Table Name"
                    onChange={handleKeyUp}
                    className={style.inputField}
                    inputProps={{ "data-testid": "search-tables" }}
                />
            </Box>
            <PopUpMolecule
                popup={{
                    open: popupData.isOpen,
                    close: () => {
                        dispatch(closePopup());
                    },
                    tableName: tableData[popupData.tableIndex].tableName,
                    totalPrice: tableData[popupData.tableIndex].totalPrice,
                }}
                popupData={{
                    items: tableData[popupData.tableIndex].items,
                    onServingsChange: onServingsChange,
                    onDelete: onDelete,
                }}
            />
            <Box className={style.list}>
                {(
                    tableData.filter((table) =>
                        table.tableName
                            .toLowerCase()
                            .includes(searchBarText.toLowerCase())
                    ) || tableData
                ).map((element) => (
                    <TableComp
                        key={"table-" + element.id}
                        onDragOver={allowDrop}
                        onDrop={(event) => drop(event, element.id)}
                        onClick={() => click(element.id)}
                        data={element}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TablesList;
