import React from 'react';
var factorial = require('math-factorial');
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      equation: '0',
      orientation: 'portrait',
    };

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  buttonPresHandler = (ev, arg) => {
    let equation = this.state.equation;
    switch (arg) {
      case '=':
        // eslint-disable-next-line no-eval
        const result = eval(String(this.state.equation).replace(',', '.'));
        this.setState({result: result});
        break;
      case '!':
        this.setState({result: factorial(this.state.equation)});
        break;
      case '^2':
        this.setState({
          result: Math.pow(this.state.equation, 2),
        });
        break;
      case '^3':
        this.setState({
          result: Math.pow(this.state.equation, 3),
        });
        break;
      case '+/-':
        this.setState({
          // eslint-disable-next-line no-eval
          result: eval(String(this.state.equation).replace(',', '.')) * -1,
        });
        break;
      case 'e^':
        this.setState({
          // eslint-disable-next-line no-eval
          result: Math.exp(eval(this.state.equation)),
        });
        break;
      case 'C':
        this.setState({result: 0, equation: '0'});
        break;
      case ',':
        const marks = ['+', '-', '*', '/', '^'];

        let lastIndexOfMark = -2;
        marks.forEach(x => {
          const currLastIndex = equation.lastIndexOf(x);
          if (currLastIndex > -1 && lastIndexOfMark < currLastIndex) {
            lastIndexOfMark = currLastIndex;
          }
        });
        const lastIndexOfComma = equation.lastIndexOf(',');

        if (lastIndexOfComma < 0 || lastIndexOfComma < lastIndexOfMark) {
          if (marks.indexOf(equation.substring(equation.length - 1)) >= 0) {
            equation += '0';
          }
          equation += arg;
        }
        break;
      default:
        const isArgMark = isNaN(parseInt(arg, 10));
        if (isArgMark) {
          if (!isNaN(parseInt(equation.substring(equation.length - 1), 10))) {
            equation += arg;
          } else {
            equation = equation.substring(0, equation.length - 1) + arg;
          }
        } else {
          if (equation == '0') {
            equation = arg;
          } else {
            equation += arg;
          }
        }
        break;
    }
    if (this.state.equation != equation) {
      this.setState({equation: equation});
    }
  };

  render() {
    if (this.state.orientation === 'portrait') {
      return (
        <View style={styles.main}>
          <View style={styles.equationView}>
            <Text style={styles.equationText}>{this.state.equation}</Text>
          </View>
          <View style={styles.resultView}>
            <Text style={styles.resultText}>{this.state.result}</Text>
          </View>
          <View style={styles.buttonsView}>
            <View style={styles.digitsView}>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => ev => this.buttonPresHandler(ev, '7')}>
                  <Text style={styles.buttonText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '8')}>
                  <Text style={styles.buttonText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '9')}>
                  <Text style={styles.buttonText}>9</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '4')}>
                  <Text style={styles.buttonText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '5')}>
                  <Text style={styles.buttonText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '6')}>
                  <Text style={styles.buttonText}>6</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '1')}>
                  <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '2')}>
                  <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '3')}>
                  <Text style={styles.buttonText}>3</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#606060'}]}
                  onPress={ev => this.buttonPresHandler(ev, 'C')}>
                  <Text style={styles.buttonText}>AC</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '0')}>
                  <Text style={styles.buttonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#606060'}]}
                  onPress={ev => this.buttonPresHandler(ev, ',')}>
                  <Text style={styles.buttonText}>.</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.marksView}>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '/')}>
                <Text style={styles.buttonText}>/</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '*')}>
                <Text style={styles.buttonText}>*</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '-')}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '+')}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#808080'}]}
                onPress={ev => this.buttonPresHandler(ev, '=')}>
                <Text style={styles.buttonText}>=</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.main}>
          <View style={styles.equationView}>
            <Text style={styles.equationText}>{this.state.equation}</Text>
          </View>
          <View style={styles.resultView}>
            <Text style={styles.resultText}>{this.state.result}</Text>
          </View>
          <View style={styles.buttonsView}>
            <View style={styles.digitsView}>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => ev => this.buttonPresHandler(ev, '7')}>
                  <Text style={styles.buttonText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '8')}>
                  <Text style={styles.buttonText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '9')}>
                  <Text style={styles.buttonText}>9</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '4')}>
                  <Text style={styles.buttonText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '5')}>
                  <Text style={styles.buttonText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '6')}>
                  <Text style={styles.buttonText}>6</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '1')}>
                  <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '2')}>
                  <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '3')}>
                  <Text style={styles.buttonText}>3</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#606060'}]}
                  onPress={ev => this.buttonPresHandler(ev, 'C')}>
                  <Text style={styles.buttonText}>AC</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ev => this.buttonPresHandler(ev, '0')}>
                  <Text style={styles.buttonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#606060'}]}
                  onPress={ev => this.buttonPresHandler(ev, ',')}>
                  <Text style={styles.buttonText}>.</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.marksViewLandscape}>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '/')}>
                <Text style={styles.buttonText}>/</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '*')}>
                <Text style={styles.buttonText}>*</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '-')}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '+')}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#808080'}]}
                onPress={ev => this.buttonPresHandler(ev, '=')}>
                <Text style={styles.buttonText}>=</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.marksViewLandscape}>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '!')}>
                <Text style={styles.buttonText}>x!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '^2')}>
                <Text style={styles.buttonText}>x^2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '^3')}>
                <Text style={styles.buttonText}>x^3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ev => this.buttonPresHandler(ev, '+/-')}>
                <Text style={styles.buttonText}>+/-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#808080'}]}
                onPress={ev => this.buttonPresHandler(ev, 'e^')}>
                <Text style={styles.buttonText}>e^x</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#343434',
    color: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  equationView: {
    padding: 25,
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  equationText: {
    fontSize: 40,
  },
  resultView: {
    backgroundColor: '#343434',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 35,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    color: 'black',
    fontSize: 50,
    marginBottom: -25,
  },
  buttonsView: {
    backgroundColor: '#ff6600',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    flex: 7,
  },
  digitsView: {
    backgroundColor: '#ff6600',
    display: 'flex',
    flex: 3,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  marksView: {
    backgroundColor: '#808080',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  marksViewLandscape: {
    backgroundColor: '#808080',
    display: 'flex',
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flex: 4,
  },
  button: {
    height: '100%',
    display: 'flex',
    borderColor: '#343434',
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
  },
});
