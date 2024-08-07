import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { FlatList } from 'react-native-gesture-handler';
import MoviePoster from './MoviePoster';
import { useEffect, useRef } from 'react';


interface Props {
	movies: Movie[];
	title?: string;
	loadNextPage?: () => void;
}

export const HorizontalCarousel = ({ movies, title, loadNextPage }: Props) => {


	// isLoading -->Tenemos que determinar cuando nosotros estamos cargando , es decir se esta llamando la funcion porque sino la vamos a disparar muchas veces
	// useRef porque no necesito renderizar nada
	const isLoading = useRef(false);
	// si queremos usar un loading o algo visual entonces no uso el useRef, uso un useState
	// porque el useRef no dispara re render

	// useEffect para regresar el isLoadin a false (estado original):
	useEffect(() => {
		// para que se aprecie y no sea tan rapido entonces setTimeout
		// eperamos 2 segundos antes de cambiar el estado
		setTimeout(() => {
			isLoading.current = false;
		}, 200);
	}, [movies])

	const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

		// si isloading esta en true entonces hacemos un return para no seguir ejecutando
		if (isLoading.current) return




		const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent

		// asi me puedo fijar cuando llegamos al final con esos valores:
		// console.log({ contentOffset, layoutMeasurement, contentSize });

		const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width;
		if (!isEndReached) return;

		// Tan pronto nosotros sabemos que vamos a cargar algo:
		isLoading.current = true;

		// Cargar las siguientes peliculas -> usamos el argumento loadNextPage
		loadNextPage && loadNextPage();

	}


	return (
		<View
			style={{ height: title ? 260 : 220 }}
		>
			{
				title && (
					<Text
						style={{
							fontSize: 30,
							fontWeight: 300,
							marginLeft: 10,
							marginBottom: 10,
						}}
					>
						{title}
					</Text>
				)
			}

			{/* cuando queremos renderizar elementos de manera dinamica */}
			<FlatList
				data={movies}
				// renderItem lo que queremos renderizar
				renderItem={({ item }) => (
					<MoviePoster
						movie={item}
						width={140}
						height={200}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				horizontal={true}
				showsHorizontalScrollIndicator={false}

				// Para saber cuando estoy en el final:
				// veo el tipado del evento que es NativeSyntheticEvent<NativeScrollEvent>
				// onScroll={(event) => onScroll(event)}, podemos escribirlo asi:
				onScroll={onScroll}
			// porque solo estoy mandando el argumento a la funcion entoces simplemente puedo mandar como referencia la funcion
			/>

		</View>
	)
}
