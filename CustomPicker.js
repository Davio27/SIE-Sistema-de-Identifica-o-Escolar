import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomDropdownPicker = ({ options, selectedValue, onValueChange, placeholderText }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleModalPress = () => {
    closeModal();
  };

  const handleOptionPress = (optionValue) => {
    closeModal();
    onValueChange(optionValue);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.pickerButton}>
        <Text style={styles.selectedValue}>{selectedValue || placeholderText}</Text>
        <FontAwesome name="caret-down" size={20} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={handleModalPress}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  style={styles.optionItem}
                  onPress={() => handleOptionPress(option.value)}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: 'transparent',
  },
  selectedValue: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 200,
    maxWidth: 300,
  },
  optionItem: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default CustomDropdownPicker;
