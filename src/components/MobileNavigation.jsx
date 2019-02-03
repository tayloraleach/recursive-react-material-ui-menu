import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileNavigationMenuItem from './MobileNavigationMenuItem';
import classnames from 'classnames';
import List from '@material-ui/core/List';

class MobileNavigation extends React.Component {
    state = {
        currentOpenChildId: null
    };

    handleCurrentlyOpen = (currentOpenChildId) => {
        this.setState({
            currentOpenChildId
        });
    };

    render() {
        const {
            classes,
            styles,
            data: { navigation }
        } = this.props;
        const { currentOpenChildId } = this.state;

        return (
            <List disablePadding className={classnames([styles, classes.root])}>
                {/* Loop through the navigation array and create a new menuItem for each,
                 passing the current menuItem and it's children as props */}
                {navigation.map((item) => (
                    <MobileNavigationMenuItem
                        key={item.id}
                        node={item}
                        passToParent={this.handleCurrentlyOpen}
                        currentlyOpen={currentOpenChildId}>
                        {item.children}
                    </MobileNavigationMenuItem>
                ))}
            </List>
        );
    }
}

MobileNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    styles: PropTypes.string,
    data: PropTypes.object.isRequired
};

const styles = (theme) => ({
    root: {
        width: '100%',
        padding: 0,
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        background: '#222'
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    }
});

export default withStyles(styles)(MobileNavigation);
