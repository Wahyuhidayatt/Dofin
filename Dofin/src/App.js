import React, {Component} from 'react';
import {
  StackNavigator
} from 'react-navigation';

import MainScreen from './components/MainScreen'
import FormIncome from './components/FormIncome'
import Struk from './components/Struk'
import SignIn from './components/SignIn'
import FormDream from './components/FormDream'
import DetailDreams from './components/DetailDreams'
import DetailCharts from './components/DetailCharts'
import FormCategory from './components/FormCategory'
import Icons from './components/Icons'
import Colors from './components/Colors'
import SingleDream from './components/SingleDream'
import EditDream from './components/EditDream'
import DetailCategory from './components/DetailCategory'
import SingleCategory from './components/SingleCategory'
import EditCategory from './components/EditCategory'
import Transactions from './components/Transactions'
import Drawer from './components/HeaderDrawer'
import CredentialCheck from './components/CredentialCheck'
import DetailProfile from './components/DetailProfile'
import LoginAnimation from './components/login/app'
<<<<<<< 0c0a24ca2bc3a308ce3007b37ba344928528a763
import Chart from './components/Chart'
=======
import PushNotifications from './components/PushNotifications'
>>>>>>> notification

const App = StackNavigator({
  Main            : {screen: LoginAnimation},
  MainScreen      : {screen: MainScreen},
  Income          : {screen: FormIncome},
  Dream           : {screen: FormDream},
  Struk           : {screen: Struk},
  Drawer          : {screen: Drawer},
  DetailDreams    : {screen: DetailDreams},
  DetailCharts    : {screen: DetailCharts},
  Category        : {screen: FormCategory},
  DetailCategory  : {screen: DetailCategory},
  EditCategory    : {screen: EditCategory},
  Icons           : {screen: Icons},
  Colors          : {screen: Colors},
  SingleDream     : {screen: SingleDream},
  EditDream       : {screen: EditDream},
  SingleCategory  : {screen: SingleCategory},
  DetailProfile   : {screen: DetailProfile},
  Transaction     : {screen: Transactions},
<<<<<<< 0c0a24ca2bc3a308ce3007b37ba344928528a763
  Chart           : {screen: Chart}
=======
  PushNotifications: {screen: PushNotifications},
>>>>>>> notification
},{ headerMode: 'screen' })
export default App
