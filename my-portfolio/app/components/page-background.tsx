export function PageBackground() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--background)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.24),_transparent_98%),radial-gradient(circle_at_80%_18%,_rgba(218,215,205,0.12),_transparent_40%)]" />
            <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-[#bc4749]/25 blur-3xl" />
            <div className="absolute right-[-8%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-[#02c39a]/5 blur-3xl" />
            <div className="absolute bottom-[-14%] left-[18%] h-[30rem] w-[30rem] rounded-full bg-[#3f37c9]/5 blur-3xl" />
        </div>
    );
}

export default PageBackground;