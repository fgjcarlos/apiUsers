// COMPONENTS
import CardCharacter from "./CardCharacter";

export default function ListCardCharacters({ show, charactersUsers }) {

    if (!show) return null;

    return (
        charactersUsers.map(character =>
            <CardCharacter
                key={character.id}
                character={character}
            />
        )
    )
}