import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useRef, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import { IoClose } from "react-icons/io5"
import ReactPlayer from "react-player/lazy"
import { FaPlay } from "react-icons/fa"
import { Element, Genre } from "../typings"
import {
  CheckIcon,
  PlusIcon,
  HandThumbUpIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline"

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [muted, setMuted] = useState(false)
  const [trailer, setTrailer] = useState("")
  const [genres, setGenres] = useState<Genre[]>([])
  const [addedToList, setAddedToList] = useState(false)
  let initialModalRef = useRef(null)

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data?.videos) {
        // console.log(data.videos)
        setTrailer(
          data.videos.results.filter(
            (element: Element) => element.type === "Trailer"
          )[0]?.key
        )
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  const closeModal = () => setShowModal(false)

  const handleList = async () => {
    // if (addedToList) {
    //   await deleteDoc(
    //     doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
    //   )
    //   toast(
    //     `${movie?.title || movie?.original_name} has been removed from My List`,
    //     {
    //       duration: 8000,
    //       style: toastStyle,
    //     }
    //   )
    // } else {
    //   await setDoc(
    //     doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),
    //     {
    //       ...movie,
    //     }
    //   )
    //   toast(
    //     `${movie?.title || movie?.original_name} has been added to My List.`,
    //     {
    //       duration: 8000,
    //       style: toastStyle,
    //     }
    //   )
    // }
  }

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 rounded overflow-hidden"
          onClose={closeModal}
          initialFocus={initialModalRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* <Dialog.Panel className=' w-full md:w-[70%] lg:w-[60%]'> */}
                <Dialog.Panel className="fixed h-screen py-7  overflow-hidden overflow-y-scroll scrollbar-hide left-0 right-0 z-50 mx-auto lg:w-[60%] max-w-5xl  rounded-md">
                  <Toaster position="bottom-center" />

                  <div className="relative pt-[56.25%]">
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${trailer}`}
                      width="100%"
                      height="100%"
                      style={{ position: "absolute", top: "0", left: "0" }}
                      playing
                      muted={muted}
                    />
                    <button
                      className="modalButton absolute right-5 top-7 !z-40 h-9 w-9 bg-[#181818] hover:bg-[#181818]"
                      onClick={closeModal}
                    >
                      <IoClose className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                      <div className="flex space-x-2">
                        {/* <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                          <FaPlay className="h-7 w-7 text-black" />
                          Play
                        </button> */}
                        <button className="modalButton" onClick={handleList}>
                          {addedToList ? (
                            <CheckIcon className="h-7 w-7" />
                          ) : (
                            <PlusIcon className="h-7 w-7" />
                          )}
                        </button>
                        <button className="modalButton">
                          <HandThumbUpIcon className="h-6 w-6" />
                        </button>
                      </div>
                      <button
                        className="modalButton"
                        onClick={() => setMuted(!muted)}
                      >
                        {muted ? (
                          <SpeakerXMarkIcon className="h-6 w-6" />
                        ) : (
                          <SpeakerWaveIcon className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div
                    ref={initialModalRef}
                    className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8"
                  >
                    <div className="space-y-6 text-lg">
                      <div className="flex items-center space-x-2 text-sm">
                        <p className="font-semibold text-green-400">
                          {movie?.vote_average * 10}% Match
                        </p>
                        <p className="font-light">
                          {movie?.release_date || movie?.first_air_date}
                        </p>
                        <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                          HD
                        </div>
                      </div>
                      <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                        <p className="w-5/6">{movie?.overview}</p>
                        <div className="flex flex-col space-y-3 text-sm">
                          <div>
                            <span className="text-[gray]">Genres:</span>{" "}
                            {genres.map((genre) => genre.name).join(", ")}
                          </div>

                          <div>
                            <span className="text-[gray]">
                              Original language:
                            </span>{" "}
                            {movie?.original_language}
                          </div>

                          <div>
                            <span className="text-[gray]">Total votes:</span>{" "}
                            {movie?.vote_count}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
