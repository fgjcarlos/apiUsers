import { useRef, useState } from "react";
import CarouselCharacters from "./CarouselCharacters";
import ViewCharacter from "./ViewCharacter";

export default function SectionCarousel({characters}) {

    const [characterSelected, setCharacterSelected] = useState(false);
    const [showModalCharacter, setShowModalCharacter] = useState(false)
    const lazyRoot = useRef(null)

    return (
        <div id='ref' ref={lazyRoot} className=" bg-zinc-300 p-10">

            <h2 className="capitalize mb-4 font-semibold text-xl">All characters</h2>

            <ViewCharacter
                show={showModalCharacter}
                character={characterSelected}
                onExit={() => setShowModalCharacter(false)}
            />

            <CarouselCharacters
                characters={characters}
                lazyRoot={lazyRoot}
                setCharacter={setCharacterSelected}
                setModal={setShowModalCharacter}
            />

        </div>
    )
}