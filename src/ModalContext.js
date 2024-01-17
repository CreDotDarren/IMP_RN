import React from "react";
import { Modal, StyleSheet, View } from "react-native";

const ModalContext = React.createContext();

class ModalProvider extends React.Component {
  state = { modal: null };

  render() {
    return (
      <ModalContext.Provider
        value={{
          setModal: this.setModal,
          setModal2: this.setModal2,
          setModal3: this.setModal3,
        }}
      >
        {/* modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modal !== null}
          onRequestClose={() => {
            this.setModal(null);
          }}
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(100,100,100,0.7)",
            }}
          >
            {this.state.modal}
          </View>
        </Modal>

        {this.props.children}
      </ModalContext.Provider>
    );
  }

  setModal = (modal) => {
    this.setState({ modal: modal });
  };
}

export { ModalContext, ModalProvider };
