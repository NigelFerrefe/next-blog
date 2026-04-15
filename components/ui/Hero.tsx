import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-2 lg:w-full lg:max-w-2xl">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block dark:fill-[#121212]"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div className="hidden sm:mb-10 sm:flex">
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Insights, tutorials and ideas for developers 🚀
                </div>
              </div>

              <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-dm-txt">
                Learn, build and grow with our blog
              </h1>

              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Explore articles, tutorials and real-world insights on development, design and
                modern technologies. Stay up to date and keep improving your skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          width={1280}
          height={720}
          alt="Blog cover"
          src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
          className="aspect-[3/2] object-cover lg:aspect-auto lg:size-full"
        />
      </div>
    </div>
  );
}
