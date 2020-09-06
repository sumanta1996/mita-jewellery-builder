import React, { useState } from 'react';

export const SideToggleContext = React.createContext({
    showSideContent: false,
    drawerToggleHandler: () => {}
});

export const SideToggleContextConsumer = SideToggleContext.Consumer;

const SideToggleContextProvider = props => {
    const [showSideContent, setShowSideContent] = useState(window.innerWidth<500 ? false: true);

    const drawerToggleClicked = () => {
        setShowSideContent(!showSideContent);
    }

    return (
        <SideToggleContext.Provider value={{drawerToggleHandler: drawerToggleClicked, showSideContent: showSideContent}}>
            {props.children}
        </SideToggleContext.Provider>
    )
}

export default SideToggleContextProvider;