import { Dog } from '@formidable/dogs';
import { FlatList } from 'react-native';
import DogListItem from '../components/Dogs/DogListItem';
import { useDogs } from '../lib/context/DogContext';
import { RootNavigatorProps } from '../navigators/RootNavigator';

type Props = RootNavigatorProps<'Home'>;

function HomeScreen({ navigation }: Props) {
    const { dogs, reloadDogs, setActiveDog } = useDogs();

    const onViewDog = (item: Dog) => (): void => {
        setActiveDog(item);
        navigation.push('Detail');
    };

    return (
        <FlatList
            data={dogs}
            onRefresh={reloadDogs}
            refreshing={false}
            renderItem={({ item }) => <DogListItem {...item} onViewDog={onViewDog(item)} />}
        />
    );
}

export default HomeScreen;
