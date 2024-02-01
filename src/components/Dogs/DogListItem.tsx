import { Dog } from '@formidable/dogs';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    onViewDog: () => void;
} & Dog;

function DogListItem({ onViewDog, ...dog }: Props) {
    return (
        <TouchableOpacity onPress={onViewDog} style={styles.container}>
            <Image src={dog.imageUrl} style={styles.image} />
            <View>
                <Text style={styles.name}>{dog.name}</Text>
                <Text style={styles.breed}>{dog.breed}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    image: {
        borderRadius: 20,
        height: 40,
        marginRight: 10,
        width: 40
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    breed: {}
});

export default DogListItem;
