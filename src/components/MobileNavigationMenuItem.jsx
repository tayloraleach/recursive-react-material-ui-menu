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
        if (this.props.currentlyOpen == this.props.node.id) {
            this.setState((state) => ({ open: !state.open }));
        } else {
            this.setState({ open: true }, this.props.passToParent(this.props.node.id));
        }
    };

    handleCurrentlyOpen = (id) => {
        this.setState({
            currentOpenChildId: id
        });
    };

    // These got seperated due to having an inner div inside each item to be able to set a max width and maintain styles
    getNestedBackgroundColor(depth) {
        const styles = {
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
        };
        if (depth === 1) {
            styles.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
        if (depth === 2) {
            styles.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        }
        return styles;
    }

    getNestedPadding(depth) {
        const styles = {
            paddingLeft: 0
        };
        if (depth === 1) {
            styles.paddingLeft = 15;
        }
        if (depth === 2) {
            styles.paddingLeft = 30;
        }
        return styles;
    }

    render() {
        const { classes } = this.props;
        let childnodes = null;

        // The MobileNavigationMenuItem component calls itself if there are children
        // Need to pass classes as a prop or it falls out of scope
        if (this.props.children) {
            childnodes = this.props.children.map((childnode) => {
                return (
                    <MobileNavigationMenuItem
                        key={childnode.id}
                        node={childnode}
                        classes={classes}
                        passToParent={this.handleCurrentlyOpen}
                        currentlyOpen={this.state.currentOpenChildId}>
                        {childnode.children}
                    </MobileNavigationMenuItem>
                );
            });
        }

        // Return a ListItem element
        // Display children if there are any
        return (
            <React.Fragment>
                <ListItem
                    onClick={this.handleClick}
                    className={classes.item}
                    style={this.getNestedBackgroundColor(this.props.node.depth)}>
                    <div className={classes.wrapper}>
                        <a
                            href=""
                            style={this.getNestedPadding(this.props.node.depth)}
                            className={classnames([classes.link, !childnodes.length && classes.goFullWidth])}>
                            {this.props.node.title}
                        </a>
                        {childnodes.length > 0 &&
                            (this.props.currentlyOpen == this.props.node.id && this.state.open ? (
                                <ArrowDropUp />
                            ) : (
                                <ArrowDropDown />
                            ))}
                    </div>
                </ListItem>
                {childnodes.length > 0 && (
                    <Collapse
                        in={this.props.currentlyOpen == this.props.node.id && this.state.open}
                        timeout="auto"
                        unmountOnExit>
                        <List disablePadding>{childnodes}</List>
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
