import { useBooleanState } from 'webrix/hooks'
import searchMusic from '../api/getArtistOrSong';
import '../styles/_search.scss';
import { Button, Dropdown, Icon, Text } from 'common/components';
import { useMediaQuery } from 'react-responsive';

export default function Search({ token, onSelectItem, selectedItem, onSearch }) {
	const { value: busy, setTrue: setBusy, setFalse: setNotBusy } = useBooleanState();
	const isMobile = useMediaQuery({ maxWidth: 700 });
	
	const searchWithSelection = async () => {
		setBusy();
		
		try {
			await onSearch();
		} catch {
			setNotBusy();
		}
	};
	
	return (
		<div className="search">
			<Text subHeading>What are you looking for?</Text>
			<Text className="mt-0 mb-30">Enter an artist or song on Spotify</Text>
			<div className="search__search-input">
				<Dropdown
					async
					cacheOptions
					onChange={onSelectItem}
					placeholder="Search artists or songs ..."
					loadOptions={searchMusic(token)}
					noOptionsMessage={({ inputValue }) => !inputValue ? 'Ready to search.' : inputValue.length <= 2 ? 'Type more than 2 characters to search' : 'No matching artists or songs, try changing your search.'}
					loadingMessage={() => 'Finding your match ...'}
					styles={{
						container: () => ({ height: isMobile ? 50 : 75 }),
						control: (_, { hasValue }) => ({ height: isMobile ? 50 : 75, fontSize: hasValue || isMobile ? void 0 : 20, paddingLeft: isMobile ? 5 : 20 }),
						indicatorsContainer: (base, { selectProps: { isLoading } }) => isMobile ? base : ({ ...base, width: isLoading ? 151 : 75, minWidth: 75 }),
						menuList: base => ({ ...base, maxHeight: document.body.getBoundingClientRect().height / 3 }),
						loadingIndicator: base => ({ ...base, marginLeft: 20, marginRight: 20 })
					}}
					getOptionLabel={option => (
						<div className="search__option-label">
							{
								option.images?.[0]?.url
									? <img className="search__option-label__avatar" alt="playlist-art" src={option.images?.[0]?.url} />
									: (
										<div className="search__option-label__avatar">
											<Icon name="fa-stream" size={15} />
										</div>
									)
							}
							<div>
								<Text className="mt-0 mb-5"><strong>{option.name}</strong></Text>
							</div>
						</div>
					)}
					getOptionValue={option => option.id}
				/>
			</div>
			<Button busy={busy} disabled={!selectedItem} className="mt-10" onClick={searchWithSelection}>Search with Selection</Button>
		</div>
	);
}