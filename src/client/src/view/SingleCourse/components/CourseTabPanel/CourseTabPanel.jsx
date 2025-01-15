import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabObjectivesBlock from "../TabObjectivesBlock/TabObjectivesBlock";
import TabCourseOutlineBlock from "../TabCourseOutlineBlock/TabCourseOutlineBlock";
import TabCommentsBlock from "../../../Common/containers/TabCommentsContainer/TabCommentsBlock";
import TabReviewsBlock from "../TabReviewsBlock/TabReviewsBlock";

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CourseTabPanel({course}) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      variant='fullwidth'>
                    <Tab label="Objectives" {...a11yProps(0)} />
                    <Tab label="Course Outline" {...a11yProps(1)} />
                    <Tab label="Comments" {...a11yProps(2)}/>
                    <Tab label="Reviews" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} children={<TabObjectivesBlock course={course}/>}/>
            <CustomTabPanel value={value} index={1} children={<TabCourseOutlineBlock lessonsCollection={course.lessons}/>}/>
            <CustomTabPanel value={value} index={2} children={<TabCommentsBlock commentsCollection={course.comments} postOrCourseId={course.id} isPost={false}/>}/>
            <CustomTabPanel value={value} index={3} children={<TabReviewsBlock course={course} reviewsCollection={course.reviews}/>}/>

        </Box>
    );
}
