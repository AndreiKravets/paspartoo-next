import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import {motion } from "framer-motion";
import { useEffect } from "react";



export default function MainContainer({children, header_footer = '', title = 'Paspartoo', isVisible = 'noindex, nofollow', description}){
    useEffect(() => {
        window.scrollTo(0, 1);
    },[])

       const variants = {
            hidden: {scale: 1, x: 0, opacity: 0.5},
            enter: {scale: 1, x: 0, opacity: 1, transition: {duration: 0.15, ease: [0.48, 0.15, 0.25, 0.96]}},
            exit: {
                scale: 1,
                x: -500,
                opacity: 0,
                transition: {duration: 0.15, ease: [0.48, 0.15, 0.25, 0.96]}
            }
        }

    return (
        <>
            <Head>
                <meta keywords="shopify next"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta key="robots" name="robots" content={isVisible} />
                <meta name="description" content={description} />
                <title>{title}</title>
            </Head>
            <div id="root">
                    <Header header = {header_footer}/>
                          <motion.main
                              variants={variants}
                              initial="hidden"
                              animate="enter"
                              exit="exit"
                              transition={{ type: 'linear' }}
                              className=""
                          >
                              {children}
                          </motion.main>
                    <Footer footer = {header_footer}/>
            </div>
        </>
    )
}