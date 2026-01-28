import { FaGithub } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
            <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex items-center gap-4">
                    <img src="/Clone.png" alt="logo" className="w-52" />
                    <a href="https://github.com/yashuchirag/netflix-clone" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
                        Designed by Chirag. Source code is available on<FaGithub/>
                    </a>
                </div>
            </div>
        </footer>
    );
}