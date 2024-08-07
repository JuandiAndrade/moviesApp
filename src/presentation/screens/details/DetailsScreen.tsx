// import { useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { Text, View } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation'
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../movie/MovieHeader';
import { MovieDetail } from '../../movie/MovieDetail';
import { ScrollView } from 'react-native-gesture-handler';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

// 2da forma para obtener la info
interface Props extends StackScreenProps<RootStackParams, 'Details'> { };

export const DetailsScreen = ({ route }: Props) => {

  // 1ra forma de optener el id de la pelicula
  // Y sabemos que cuando definimos el RooktStackParams le pusimos el movieId
  // const {movieId} = useRoute().params;
  // console.log({movieId})


  // 2da forma, como nos entontramos en un screen directamente (DetailScreen), nosotros tenemos la informacion de la ruta

  const { movieId } = route.params;
  // console.log({movieId})

  const { isLoading, movie, cast=[] } = useMovie(movieId);
  // en el casto le digo qeu si no viene nada que sea un array vacio, asi no pongo "!"

  if (isLoading) {
    return <FullScreenLoader />
  }



  return (
    // <View> --> cambiamos el view para que tenga scroll
    <ScrollView>

      {/* Header */}
      {/* <MovieHeader movie={movie!}/> */}
      <MovieHeader originalTitle={movie!.originalTitle} poster={movie!.poster} title={movie!.title} />

      {/* Details */}
      <MovieDetail movie={movie!} cast={cast}/>
    </ScrollView>
  )
}
