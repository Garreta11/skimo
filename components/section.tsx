'use client'
import { useEffect, useRef } from "react"
import gsap from 'gsap'
import SplitType from 'split-type';

export default function Section({ title, text, side = 'left', mediapath, video=false }: { title: string, text: string, side?: string, mediapath: string, video?:boolean }) {
  
  const titleRef = useRef<any>()
  const textRef = useRef<any>()
  const container = useRef<any>()

  useEffect(() => {
    gsap.from(textRef.current,
      {
          y: 300,
          opacity: 0.1,
          scrollTrigger: {
              trigger: container.current,
              start: "top 50%",
              end: "bottom 100%",
              markers: false,
              scrub: 1,
          }
      }
  );

  gsap.from(titleRef.current,
      {
          y: 200,
          scrollTrigger: {
              trigger: container.current,
              start: "top 50%",
              end: "bottom 100%",
              markers: false,
              scrub: 1
          }
      }
  );
    setTimeout(() => {
      // Parallax images
      gsap.utils.toArray('.parallax').forEach((section: any) => {
        const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;
  
        gsap.fromTo(
          section,
          {
            y: -heightDiff,
          },
          {
            scrollTrigger: {
              trigger: section.parentElement,
              scrub: true,
            },
            y: 0,
            ease: 'none',
          }
        );
      });
      // Scroll Text Reveal
      gsap.utils.toArray('.text-reveal').forEach((t: any) => {
        const text = new SplitType(t, { types: 'chars,words' });
  
        gsap.from(text.chars, {
          scrollTrigger: {
            trigger: t,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
            markers: false,
          },
          opacity: 0.3,
          stagger: 0.1,
        });
      })
    }, 1000)
  }, [])
  
  return (
    <section ref={container} className={`w-full min-h-screen flex items-center font-panchang flex-col mb-8 lg:mb-0 ${side == 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* {children} */}
      <div className="w-full lg:w-1/2 p-8 py-14 lg:py-8">
            <h2 ref={titleRef} className="text-3xl lg:text-5xl font-bold">{title}</h2>
            <p ref={textRef} className="text-reveal text-1xl">{text}</p>
          </div>
          <div className="w-full lg:w-1/2">
            {video && (
              <video className="w-full h-auto" width="1920" height="1080" controls={false} muted autoPlay loop>
                <source src={mediapath} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            )}
            {!video && (
              <div className="w-full padding-parallax before:padding-parallax-before">
                <div
                  className="parallax absolute bg-center bg-no-repeat bg-cover -inset-y-32 -inset-x-32"
                  style={{
                    backgroundImage: `url(${mediapath})`,
                  }}
                />
              </div>
            )}
          </div>
    </section>
  )
}
