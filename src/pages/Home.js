import React, { Component } from 'react';
import MobileNavigaion from '../components/MobileNavigation'
import fakeData from '../fakeData'

const styles = {
    root: {
        marginTop: 30
    }
}

class Home extends Component {
    render() {
        return (
            <div style={styles.root}>
              <MobileNavigaion data={fakeData}/>
            </div>
        );
    }
}

export default Home;