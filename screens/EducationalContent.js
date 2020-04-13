import React, {Component} from 'react';
import {Platform, Text, View, Linking, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import {CardList} from 'react-native-card-list';


const Title = props => (
  <Text style={{fontWeight: 'bold', textAlign: 'justify', fontSize: 20}}>
    {props.children}
  </Text>
);

const Subtitle = props => (
  <Text style={{fontWeight: '200', textAlign: 'center', fontSize: 15}}>
    {props.children}
  </Text>
);

const Bold = props => (
  <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
    {props.children}
  </Text>
);

const cards = [
  {
    id: '0',
    title: (
      <Text style={{fontSize: 35, textAlign: 'center'}}>
        Diabetes Diet: Create Your Healthy-Eating Plan
      </Text>
    ),
    picture: require('../assets/background.jpg'),
    content: (
      <View>
        <Text style={{textAlign: 'justify'}}>
          <Title>
            Your diabetes diet is simply a healthy-eating plan that will help
            you control your blood sugar. Here's help getting started, from meal
            planning to counting carbohydrates.
          </Title>
          {'\n'}
          {'\n'}A diabetes diet simply means eating the healthiest foods in
          moderate amounts and sticking to regular mealtimes. A diabetes diet is
          a healthy-eating plan that's naturally rich in nutrients and low in
          fat and calories. Key elements are fruits, vegetables and whole
          grains. In fact, a diabetes diet is the best eating plan for most
          everyone.
          <Subtitle>
            {'\n'}
            {'\n'}What does a diabetes diet involve?{'\n'}
          </Subtitle>{' '}
          A diabetes diet is based on eating three meals a day at regular times.
          This helps you better use the insulin that your body produces or gets
          through a medication. A registered dietitian can help you put together
          a diet based on your health goals, tastes and lifestyle. He or she can
          also talk with you about how to improve your eating habits, such as
          choosing portion sizes that suit the needs for your size and activity
          level.
          <Subtitle>
            {'\n'}
            {'\n'}Recommended foods {'\n'}
          </Subtitle>{' '}
          Make your calories count with these nutritious foods. Focus on healthy
          carbohydrates, such as: fruits, vegetables, whole grains, legumes,
          low-fat dairy products, such as milk and cheese. Foods high in fiber
          including vegetables, fruits, nuts, legumes, such as beans and peas,
          whole grains. Eat heart-healthy fish at least twice a week. Fish such
          as salmon, mackerel, tuna and sardines are rich in omega-3 fatty
          acids, which may prevent heart disease. Foods containing
          monounsaturated and polyunsaturated fats can help lower your
          cholesterol levels. These include: avocados, nuts, olive and peanut
          oils.
        </Text>
        <Button
          onPress={() =>
            Linking.openURL(
              'https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/diabetes-diet/art-20044295',
            )
          }
          title="Interested in what foods to avoid...? Click here for the full article."
        />
      </View>
    ),
  },
  {
    id: '1',
    title: (
      <Text style={{fontSize: 35, textAlign: 'center'}}>
        Exercise Tips for Type 2 Diabetes
      </Text>
    ),
    picture: require('../assets/background.jpg'),
    content: (
      <View>
        <Text style={{textAlign: 'justify'}}>
          <Title>
            Exercise is sure to be on your to-do list if you have diabetes. Get
            started with these go-to tips:
          </Title>
          {'\n'}
          {'\n'}
          <Subtitle>1. Make a list of fun activities.{'\n'}</Subtitle> You have
          lots of options, and you don't have to go to a gym. What sounds good?
          Think about something you've always wanted to try or something you
          enjoyed in the past. Sports, dancing, yoga, walking, and swimming are
          a few ideas. Anything that raises your heart rate counts.{' '}
          <Subtitle>
            {'\n'}
            {'\n'}2. Get your doctor's OK. {'\n'}
          </Subtitle>{' '}
          Let them know what you want to do. They can make sure you're ready for
          it. They'll also check to see if you need to change your meals,
          insulin, or diabetes medicines. Your doctor can also let you know if
          the time of day you exercise matters.
          <Subtitle>
            {'\n'}
            {'\n'}3. Check your blood sugar. {'\n'}
          </Subtitle>{' '}
          Ask your doctor if you should check it before exercise. If you plan to
          work out for more than an hour, check your blood sugar levels
          regularly during your workout, so you’ll know if you need a snack.
          Check your blood sugar after every workout, so that you can adjust if
          needed.{' '}
          <Subtitle>
            {'\n'}
            {'\n'}4.Carry carbs.{'\n'}
          </Subtitle>{' '}
          Always keep a small carbohydrate snack, like fruit or a fruit drink,
          on hand in case your blood sugar gets low.{' '}
          <Subtitle>
            {'\n'}
            {'\n'}5. Ease into it.{'\n'}
          </Subtitle>{' '}
          If you're not active now, start with 10 minutes of exercise at a time.
          Gradually work up to 30 minutes a day.
        </Text>
        <Button
          onPress={() =>
            Linking.openURL(
              'https://www.webmd.com/diabetes/exercise-guidelines',
            )
          }
          title="Interested in reading more exercise tips...? Click here to follow the source link"
        />
      </View>
    ),
  },
  {
    id: '2',
    title: (
      <Text style={{fontSize: 35, textAlign: 'center'}}>
        Statistics About Diabetes
      </Text>
    ),
    picture: require('../assets/background.jpg'),
    content: (
      <View>
        <Text style={{textAlign: 'justify'}}>
          <Title>Diabetes in numbers: General</Title>
          {'\n'}
          {'\n'}
          <Subtitle>Prevalence{'\n'}</Subtitle> In 2018, 34.2 million Americans,
          or 10.5% of the population, had diabetes. Nearly 1.6 million Americans
          have type 1 diabetes, including about 187,000 children and
          adolescents.{' '}
          <Subtitle>
            {'\n'}
            {'\n'}Undiagnosed{'\n'}
          </Subtitle>{' '}
          Of the 34.2 million adults with diabetes, 26.8 million were diagnosed,
          and 7.3 million were undiagnosed.
          <Subtitle>
            {'\n'}
            {'\n'}Prevalance in seniors {'\n'}
          </Subtitle>{' '}
          The percentage of Americans age 65 and older remains high, at 26.8%,
          or 14.3 million seniors (diagnosed and undiagnosed).{' '}
          <Subtitle>
            {'\n'}
            {'\n'}New Cases{'\n'}
          </Subtitle>{' '}
          1.5 million Americans are diagnosed with diabetes every year{' '}
          <Subtitle>
            {'\n'}
            {'\n'}Prediabetes{'\n'}
          </Subtitle>{' '}
          In 2015, 88 million Americans age 18 and older had prediabetes.
          <Title>
            {'\n'}
            {'\n'}Diabetes in youth{'\n'}
            {'\n'}
          </Title>
          About 210,000 Americans under age 20 are estimated to have diagnosed
          diabetes, approximately 0.25% of that population. In 2014—2015, the
          annual incidence of diagnosed diabetes in youth was estimated at
          18,200 with type 1 diabetes, 5,800 with type 2 diabetes
        </Text>
        <Button
          onPress={() =>
            Linking.openURL(
              'https://www.diabetes.org/resources/statistics/statistics-about-diabetes',
            )
          }
          title="Interested in reading more, including diabetes in youth & diabetes by
          race/ethnicity statistics? Click here"
        />
      </View>
    ),
  },
];

class EducationalContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CardList cards={cards} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    marginTop: 45,
  },
  header: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default EducationalContent;
