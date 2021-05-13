import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    nav: {
        height: "10vh",
    },
    title: {
        width: "30vw",
        textAlign: "center",
    },
    body: {
        display: "flex",
        height: "90vh",
    },
    tableList: {
        width: "30vw",
    },
    itemList: {
        width: "70vw",
    },
}));

const HomeTemplate = (props) => {
    const style = styles();

    return props.isLoading ? (
        <Box className={style.root}>
            <CircularProgress style={{ height: "100px", width: "100px" }} />
        </Box>
    ) : (
        <Box className={style.root}>
            <Box className={style.nav}>{props.navigationBarComponent}</Box>
            <Box className={style.body}>
                <Box className={style.tableList}>
                    {props.tableListComponent}
                </Box>
                <Box className={style.itemList}>{props.itemListComponent}</Box>
            </Box>
        </Box>
    );
};

HomeTemplate.propsType = {
    navigationBarComponent: PropTypes.element.isRequired,
    itemListComponent: PropTypes.element.isRequired,
    tableListComponent: PropTypes.element.isRequired,
};

export default HomeTemplate;