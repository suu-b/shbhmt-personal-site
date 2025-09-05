import { Anchor } from "./Anchor"

export default function Contact() {
    return (
        <section id="contact" className="w-full px-4 text-justify pb-10 mx-auto">
            <p className="mb-2 text-center">For a professional portfolio of me, refer to <Anchor text="this" link={"http://localhost:5000/pro"}/> link.</p>

            <p>I hope something here has clicked your interest. We can connect! You can drop a mail at: &nbsp;
                <a className="bg-gray-400 text-slate-900 rounded p-0.5">suub[dot]author[at]gmail[dot]com</a> or find me on Linkedin: &nbsp;
                <a href="https://in.linkedin.com/in/hey-shubham-thakur" target="_blank" rel="noreferrer" className="bg-gray-400 text-slate-900 rounded p-0.5">here</a>
            </p>
        </section>
    )
}