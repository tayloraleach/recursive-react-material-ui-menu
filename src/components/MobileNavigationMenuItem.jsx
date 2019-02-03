import React from 'react';
import { ListItem, Collapse, List } from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class MobileNavigationMenuItem extends React.Component {
    state = {
        open: false,
        id: this.props.node.id,
        currentOpenChildId: null
    };

    handleClick = () => {
        const { currentlyOpen, node, passToParent } = this.props;
        if (currentlyOpen === node.id) {
            this.setState((state) => ({ open: !state.open }));
        } else {
            this.setState({ open: true }, passToParent(node.id));
        }
    };

    handleCurrentlyOpen = (currentOpenChildId) => {
        this.setState({
            currentOpenChildId
        });
    };

    getNestedBackgroundColor(depth) {
        const STEP = 0.05;
        let alpha = STEP * (depth + 1); // 0 index
        return {
            backgroundColor: `rgba(255, 255, 255, ${alpha})`
        };
    }

    getNestedPadding(depth) {
        const STEP = 15;
        return {
            paddingLeft: depth * STEP
        };
    }

    render() {
        const { classes, node, currentlyOpen, children } = this.props;
        const { open, currentOpenChildId } = this.state;

        return (
            <React.Fragment>
                <ListItem
                    onClick={this.handleClick}
                    className={classes.item}
                    style={this.getNestedBackgroundColor(node.depth)}>
                    <div className={classes.wrapper}>
                        <a
                            href=""
                            style={this.getNestedPadding(node.depth)}
                            className={classnames([classes.link, !children.length && classes.goFullWidth])}>
                            {node.title}
                        </a>
                        {children.length > 0 &&
                            (currentlyOpen === node.id && open ? <ArrowDropUp /> : <ArrowDropDown />)}
                    </div>
                </ListItem>
                {children && (
                    <Collapse in={currentlyOpen === node.id && open} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            {this.props.children.map((childnode) => (
                                <MobileNavigationMenuItem
                                    key={childnode.id}
                                    node={childnode}
                                    classes={classes}
                                    passToParent={this.handleCurrentlyOpen}
                                    currentlyOpen={currentOpenChildId}>
                                    {childnode.children}
                                </MobileNavigationMenuItem>
                            ))}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    }
}

MobileNavigationMenuItem.propTypes = {
    classes: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    passToParent: PropTypes.func.isRequired,
    currentlyOpen: PropTypes.string
};

const styles = (theme) => ({
    link: {
        color: '#fff',
        textDecoration: 'none'
    },
    goFullWidth: {
        width: '100%'
    },
    item: {
        minHeight: 48,
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '12px 15px',
        boxShadow: 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.15)',
        '& svg': {
            marginLeft: 'auto'
        }
    },
    wrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '440px', // any value here
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        }
    }
});

export default withStyles(styles)(MobileNavigationMenuItem);
