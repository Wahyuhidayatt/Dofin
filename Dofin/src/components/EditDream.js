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
  ActionSheet,
  Form,
  Item,
  Label,
  Input,
  Spinner,
  Card
} from 'native-base';
import {
  Alert
} from 'react-native';
import {updateDreamRequest} from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class FormDream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dream: '',
      description: '',
      target_value: 0,
      _id: '',
      record_by: '',
      loading: false,
    }
  }
  static navigationOptions = {
    header: null
  }
  _sendData(){
    let self = this
    Alert.alert(
      'Are you sure?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'OK', onPress: () => {
          self.setState({
            loading: !self.state.visible
          });
          self.props.updateDreamRequest(this.state)
          self.props.navigation.navigate("MainScreen")
        }},
      ]
    )
  }
  _onChangeInputDream(event){
    this.setState({dream: event.nativeEvent.text})
  }
  _onChangeInputDescription(event){
    this.setState({description: event.nativeEvent.text})
  }
  _onChangeInputTargetValue(event){
    this.setState({target_value: event.nativeEvent.text})
  }

  componentDidMount(){
    if (this.props.postIncome !== null) {
      this.setState({
        loading: false
      });
    }
    this.setState({
      dream       : this.props.navigation.state.params.data.dream,
      description : this.props.navigation.state.params.data.description,
      _id         : this.props.navigation.state.params.data._id,
      record_by   : this.props.navigation.state.params.data._id,
      target_value: this.props.navigation.state.params.data.target_value
    });
  }
  render(){
    const {dream} = this.props.navigation.state.params.data
    const { goBack } = this.props.navigation;
    return (
      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left>
              <Button transparent
                onPress={() => this.props.navigation.navigate("DetailDreams")}
              >
                  <Icon name='ios-arrow-back-outline' />
              </Button>
            </Left>
            <Body>
              <Title>Edit Dream</Title>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}}>
            <Form onSubmit={()=>this.handleSubmit()}>
              <Card>
                <Item >
                  <Icon active name='ios-moon-outline' style={{marginRight: 13}}/>
                  <Input
                    ref="dream"
                    name="dream"
                    placeholder="dream"
                    value={this.state.dream}
                    onChange={(event) => { this._onChangeInputDream(event) }}
                  />

                </Item>
                <Item >
                  <Icon active name='md-create' style={{marginRight: 13}}/>
                  <Input
                    ref="description"
                    name="description"
                    placeholder="description"
                    value={this.state.description}
                    onChange={(event) => { this._onChangeInputDescription(event) }}
                  />
                </Item>
                <Item >
                  <Icon active name='logo-usd' style={{marginRight: 13}}/>
                  <Input
                    ref="target_value"
                    name="target_value"
                    placeholder="Target Value"
                    keyboardType="numeric"
                    value={this.state.target_value}
                    onChange={(event) => { this._onChangeInputTargetValue(event) }}
                  />
                </Item>
              </Card>

              <Button type="submit" block style={{marginTop: 40, backgroundColor: "#2196F3"}} onPress={() => { this._sendData() }}>
                { (this.state.loading) ? (<Spinner color='#FFF' />) : (<Text> Save </Text>)}
              </Button>
            </Form>
          </Content>
      </Container>
    )
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    updateDreamRequest : data => dispatch(updateDreamRequest(data))
  }
}

const mapsStateToProps = state => {
  return {
    postDream: state
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(FormDream)
