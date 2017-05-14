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

import {updateDreamRequest} from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class FormDream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dream: '',
      description: '',
      _id: '',
      record_by: '',
      loading: false,
    }
  }
  static navigationOptions = {
    header: null
  }
  _sendData(){
    this.setState({
      loading: !this.state.visible
    });
    this.props.updateDreamRequest(this.state)
    this.props.navigation.navigate("Main")
  }
  _onChangeInputDream(event){
    this.setState({dream: event.nativeEvent.text})
  }
  _onChangeInputDescription(event){
    this.setState({description: event.nativeEvent.text})
  }

  componentDidMount(){
    if (this.props.postIncome !== null) {
      this.setState({
        loading: false
      });
    }
    this.setState({
      dream       : this.props.navigation.state.params.data.dream,
      description : "",
      _id         : this.props.navigation.state.params.data._id,
      record_by   : this.props.navigation.state.params.data._id
    });
  }
  render(){
    const {dream} = this.props.navigation.state.params.data
    const { goBack } = this.props.navigation;
    return (
      <Container>
          <Header>
            <Left>
              <Button transparent
                onPress={() => this.props.navigation.navigate("DetailDreams")}
              >
                  <Icon name='arrow-back' />
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
              </Card>

              <Button type="submit" block style={{marginTop: 40}} onPress={() => { this._sendData() }}>
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