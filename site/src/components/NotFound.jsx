import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section id="not-found" className="w-full mt-48 max-w-2xl px-4 text-base sm:text-lg text-center mx-auto">
            <h1 className="text-4xl text-center mb-0">404 Not Found</h1>
            <div id="content">
                <p className="text-slate-300 text-lg mt-5 mb-8 text-center">
                    The page you are looking either may be under development or does not exist. You can check pages planned for the website in the link given below. Stick around! Would be probably here soon.
                </p>
            </div>
            <div className="flex justify-center mt-5 mb-8 gap-4">
                <Link to="/" className="bg-gray-400 text-slate-900 rounded p-2">Go to Homepage</Link>
            </div>
        </section>
    )
}