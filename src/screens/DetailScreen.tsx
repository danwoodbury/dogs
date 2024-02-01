import { Dog } from '@formidable/dogs';
import { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDogs } from '../lib/context/DogContext';
import { RootNavigatorProps } from '../navigators/RootNavigator';

type Props = RootNavigatorProps<'Detail'>;

function DetailScreen({ navigation }: Props) {
    // Could maybe pass data through the screen params so if there are multiple screens loaded they are not all looking at the same dog
    const { activeDog, updateDog } = useDogs();

    useEffect(() => {
        navigation.setOptions({ title: activeDog ? activeDog.name : 'Unknown Dog' });
    });

    if (!activeDog) {
        // Should never get here but lets make TS happy
        return <Text>No dogs to see here :(</Text>;
    }

    const onChangeName = (value: string) => {
        navigation.setOptions({ title: value });
        updateDog('name', value);
    };

    const onChangeValue = (field: keyof Pick<Dog, 'breed' | 'color' | 'description' | 'name'>) => (value: string) => {
        updateDog(field, value);
    };

    return (
        <View>
            <Image src={activeDog.imageUrl} style={styles.image} />
            <TextInput onChangeText={onChangeName} style={styles.input} value={activeDog.name} />
            <TextInput onChangeText={onChangeValue('color')} style={styles.input} value={activeDog.color} />
            <TextInput onChangeText={onChangeValue('breed')} style={styles.input} value={activeDog.breed} />

            <TextInput
                multiline={true}
                onChangeText={onChangeValue('description')}
                style={styles.input}
                value={activeDog.description}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    image: {
        aspectRatio: 1,
        width: Dimensions.get('screen').width
    },
    input: {
        borderWidth: 1,
        margin: 20,
        marginBottom: 0,
        padding: 10
    }
});

export default DetailScreen;
