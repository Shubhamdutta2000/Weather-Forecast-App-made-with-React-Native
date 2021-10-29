import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import style from './Header.style';

const Header = (props) => {
    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: "#6200ee",
                }
            }}
            style={style.header}
        >
            <Title style={{ color: "white" }}>
                {props.name}
            </Title>

        </Appbar.Header>
    );
}

export default Header;