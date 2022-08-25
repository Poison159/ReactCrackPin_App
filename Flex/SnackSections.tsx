
import React from "react";
import { Snackbar } from "react-native-paper";

interface SnackSectionProps{
    visible:boolean,
    onDismissSnackBar():void,
    snackMsg:string
}

const SnackSecation:React.FC<SnackSectionProps> = ({visible,onDismissSnackBar,snackMsg}) => {
    return(
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'close',
            onPress: () => {
              
            },
          }}>
          {snackMsg}
        </Snackbar>
    );
}

export default SnackSecation;