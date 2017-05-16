import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  Header,
  Icon,
  View,
  Left,
  Button,
  Body,
  Title,
  Right,
  Form,
  Item,
  Label,
  Input,
  Segment,
  ActionSheet,
  Thumbnail,
  Badge
} from 'native-base';
import {
  ListView,
  CameraRoll,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { expenseRequest, placesRequest } from '../actions';
import Camera from './Camera'

class FormStruk extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'Struk',
      active: '',
      amount: '',
      category: '',
      items: [],
      description: '',
      location: '',
      photos: '',
      images: [],
      modalVisible: false,
    }
  }
  static navigationOptions = {
    header: null
  }
  simulateClick(){
    return true
  }
  simulateCamera(){
    return true
  }
  activePageNonStruk(){
    this.setState({page: "nonStruk"})
    this.setState({active: "active"})
  }
  activePageStruk(){
    this.setState({page: "Struk"})
    this.setState({active: "active"})

  }
  _onChangeInputAmount(amount){
    this.setState({ amount: Number(amount) })
  }
  _onChangeInputCategory(category){
    this.setState({ category })
  }
  _onChangeInputItems(items){
    this.setState({ items })
  }
  _onChangeInputDescription(description){
    this.setState({ description })
  }
  _onChangeInputLocation(location){
    this.setState({ location })
  }
  _onChangeInputPhotos(photos){
    this.setState({ photos: photos.node.image.uri })
  }
  _sendData() {
    this.props.expenseRequest(this.state)
  }
  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  getPhotos() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then((r) => {
      this.setState({images: r.edges})
    })
  }

  setIndex(index) {
    this.setState({ index })
  }

  componentDidMount() {
    this.props.placesRequest()
  }
  render(){
    const { navigate, goBack } = this.props.navigation
    const BUTTONS = [
      'Food and Drink',
      'Travel',
      'Entertainment',
      'Transportation',
      'Healthcare',
      'Clothing',
      'Rent',
      'Education',
      'Cancel'
    ];
    const { width } = Dimensions.get('window')
    const { places } = this.props
    let placesData = []
    if (this.props.places !== 0) {
      places.map((place) => {
        placesData.push(place.placeName);
      })
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(placesData)
    return (
      <Container>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left>
              <Button transparent
                onPress={() => goBack()}
              >
                  <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Segment style={{backgroundColor: "#2196F3"}}>
                <Button first onPress={() => this.activePageStruk()} style={{backgroundColor: "#2196F3"}}><Text style={{fontSize: 11}}>Struk</Text></Button>
                <Button last onPress={() => this.activePageNonStruk()} style={{backgroundColor: "#2196F3"}}><Text style={{fontSize: 11}}>Non Struk</Text></Button>
              </Segment>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}} padder>
          {(this.state.page === 'Struk') && (
            <View>
              <Form>
                <Item inlineLabel>
                  <Icon name="ios-cash" style={{color:"#558B2F"}} />
                  <Input
                    name="amount"
                    onChangeText={text => this._onChangeInputAmount(text)}
                    placeholder="Amount"
                    keyboardType = 'numeric'
                  />
                </Item>
                <Item>
                  <Icon name='cart' style={{color:"#3F51B5"}} />
                  <Input
                    name="item"
                    onChangeText={text => this._onChangeInputItems(text)}
                    placeholder="Item"
                  />
                </Item>
                <Item>
                  <Icon name='create' style={{color: "#424242"}} />
                  <Input
                    name="description"
                    onChangeText={text => this._onChangeInputDescription(text)}
                    placeholder="Description"
                  />
                </Item>
                <Item>
                  <Icon name='cube' style={{color:"#757575"}}/>
                  <Label onPress={() => ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: 8,
                      destructiveButtonIndex: 9,
                      title: 'Category'
                    },
                    (buttonIndex) => {
                      this.setState({category: BUTTONS[buttonIndex]})
                    }
                  )}> Category </Label>
                  <Input
                    name="category"
                    value={this.state.category}
                  />
                </Item>
                <Item>
                  <Icon name='pin' style={{color:"#e53935"}} />
                  <Input
                    name="location"
                    value={this.state.location}
                    placeholder="Location"
                  />
                </Item>
                <Item>
                  <ListView
                    horizontal={true}
                    dataSource = {dataSource}
                    renderRow = {(data, i) =>
                      <TouchableOpacity onPress={() => this.setState({location: data})}>
                        <Badge>
                          <Text>{data}</Text>
                        </Badge>
                      </TouchableOpacity>
                    }
                  />
                </Item>
                <Item>
                  <Icon name='calendar' style={{color:"#1E88E5"}} />
                  <Input placeholder="Date"/>
                </Item>
                <Button full success onPress={() => this._sendData()}><Text> Add Transaction </Text></Button>
              </Form>
            </View>
          )}
          {(this.state.page === "nonStruk") && (
            <View>
              <Form>
                <Item inlineLabel>
                  <Icon name="ios-cash" style={{color:"#558B2F"}} />
                  <Input
                    name="amount"
                    onChangeText={text => this._onChangeInputAmount(text)}
                    placeholder="Amount"
                    keyboardType = 'numeric'
                  />
                </Item>
                <Item>
                  <Icon name='cart' style={{color:"#3F51B5"}} />
                  <Input
                    name="item"
                    onChangeText={text => this._onChangeInputItems(text)}
                    placeholder="Item"
                  />
                </Item>
                <Item>
                  <Icon name='create' style={{color: "#424242"}} />
                  <Input
                    name="description"
                    onChangeText={text => this._onChangeInputDescription(text)}
                    placeholder="Description"
                  />
                </Item>
                <Item>
                  <Icon name='cube' style={{color:"#757575"}} />
                  <Label onPress={() => ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: 8,
                      destructiveButtonIndex: 9,
                      title: 'Category'
                    },
                    (buttonIndex) => {
                      this.setState({category: BUTTONS[buttonIndex]})
                    }
                  )}> Category </Label>
                  <Input
                    name="category"
                    value={this.state.category}
                  />
                </Item>
                <Item>
                  <Icon name='pin' style={{color:"#e53935"}} />
                  <Input
                    name="location"
                    onChangeText={text => this._onChangeInputLocation(text)}
                    placeholder="Location"/>
                </Item>
                <Item>
                  <Icon name='calendar' style={{color:"#1E88E5"}} />
                  <Input placeholder="Date"/>
                </Item>
                <Button full success onPress={() => this._sendData()}><Text> Add Transaction </Text></Button>
              </Form>
            </View>

          )}
          </Content>
          {(this.state.page === 'Struk') && (
            <Camera />
          )}
      </Container>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  photos: {
    alignItems: 'center',
    justifyContent: 'center'
  },
};

const mapDispatchToProps = dispatch => {
  return {
    expenseRequest: newExpense => dispatch(expenseRequest(newExpense)),
    placesRequest: () => dispatch(placesRequest())
  }
}

const mapStateToProps = state => {
  return {
    camera: state.camera,
    places: state.places
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStruk)
