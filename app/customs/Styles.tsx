import {StyleSheet} from 'react-native';

export enum Colors {
  Main = '#010F07',
  active = '#22A45D',
  input = '#FBFBFB',
  white = '#FFFFFF',
  gray = '#868686',
  semiWhite = '#E3E3E3',
  blue = '#4285F4',
  darkBlue = '#395998',
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container1: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  container2: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bottomItem:{
    position: 'absolute',
    bottom: 0,
  }
});

export const font = StyleSheet.create({
  h1Title: {
    fontSize: 34,
    fontWeight: '500',
    lineHeight: 42,
  },
  h2Title: {
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 36,
  },
  h3Title: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
  },
  headline: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 38,
  },
  subline: {
    fontSize: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 4
  },
  subhead: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  caption: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
  },
  button: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export const components = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSpace: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray,
  },
  boxRate: {
    width: 36,
    height: 20,
    borderRadius: 6,
    backgroundColor: Colors.active,
  },
  square: {
    width: 50,
    height: 50,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 22,
  },
  titleSpace: {
    marginBottom: 20,
    marginTop: 24,
  },
  componentsSpace: {
    marginBottom: 20,
    marginTop: 34,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  indicator: {
    width: 10,
    height: 5,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  activeIndicator1: {
    backgroundColor: Colors.active, // Style for active indicator
  },
  activeIndicator2: {
    backgroundColor: Colors.white, // Style for active indicator
  },
  inactiveIndicator: {
    backgroundColor: Colors.semiWhite, // Style for inactive indicator
    opacity: 0.6
  },
  codeFillContainer: {
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  toggleContainer: {
    width: 48,
    height: 24,
    borderRadius: 12,
  },
  topBarContainer: {
    paddingBottom: 12,
    paddingEnd: 20,
    paddingStart: 20,
    paddingTop: 10,
  },
  b1: {
    height: 48,
    backgroundColor: '#22A45D',
    borderRadius: 8,
  },
  b2: {
    minHeight: 44,
    backgroundColor: Colors.darkBlue,
    borderRadius: 8,
  },
  b2Text: {
    width: 250,
    textAlign: 'center',
    marginVertical: 5,
  },
  b2Icon: {
    position: 'absolute',
    left: 16,
  },
  b3: {
    height: 38,
    width: 113,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.active,
  },
  form1: {
    height: 54,
    backgroundColor: Colors.input,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.semiWhite,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form2: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form2Title: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  form4: {
    height: 48,
    backgroundColor: Colors.input,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  banner: {
    height: 170,
    padding: 20,
    borderRadius: 12,
  },
  cardXXsmall: {
    width: 100,
    backgroundColor: Colors.white,
  },
  cardXsmall: {
    width: 160,
    height: 160,
  },
  cardSmall: {
    width: 140,
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  cardBig: {
    width: 335,
    height: 285,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  grid: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  grid1: {
    width: 160,
    height: 220,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  grid2: {
    width: 160,
    height: 280,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  list: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lists: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  orderQuantity:{
    color: Colors.active,
    width: 24,
    height: 24,
    textAlign: 'center',
    borderColor: Colors.semiWhite,
    borderWidth: 1,
    fontWeight: '500',
    borderRadius: 4
  }
});
