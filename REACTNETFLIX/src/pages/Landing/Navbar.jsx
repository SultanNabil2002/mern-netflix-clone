import { useNavigate } from "react-router-dom"
import DefaultButton from "@/components/modules/LandingPage/DefaultButton"
import OptionLanguage from "@/components/modules/LandingPage/OptionLanguage"

function Navbar() {
    const navigate = useNavigate()

    return (
        <header className="relative z-20 bg-transparent">
            <nav className="flex flex-wrap justify-between items-center pr-10 pl-7 py-4">
                <div>
                    <img src="/netflix_logo_icon.png" alt="netflix-logo" width={105} height={45} />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <OptionLanguage />
                    <DefaultButton
                        text={"Sign In"}
                        onClick={() => navigate("/login")}
                    />
                </div>
            </nav>
        </header>
    )
}

export default Navbar