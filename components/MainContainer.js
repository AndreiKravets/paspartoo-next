import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import {motion } from "framer-motion";
import { useEffect } from "react";



export default function MainContainer({children, header_footer = '', header_class = '', title = 'Web development agency in Miami | Paspartoo',
                                          isVisible = 'noindex, nofollow', description, keywords='Paspartoo',
                                          og_locale = 'en_US', og_type = 'website', og_title = '', og_url = 'https://paspartoo.com/',
                                          og_description = 'Paspartoo is an e-commerce agency specializing in Magento 2, Shopify, and WooCommerce. Based in Miami, USA. ☎️ +1 (702) 970-4043, 📩 info@paspartoo.com',
                                          og_site_name = 'Paspartoo.com', twitter_card = '', twitter_description = '',
                                          twitter_title = '', twitter_image = '', msapplication_tileimage = ''
                                      }){
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
                <title>{title}</title>
                <meta name="keywords" content={keywords}></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta key="robots" name="robots" content={isVisible} />
                <meta name="description" content={description} />
                <meta property="og:locale" content={og_locale} />
                <meta property="og:type" content={og_type} />
                <meta property="og:title" content={og_title} />
                <meta property="og:description" content={og_description} />
                <meta property="og:url" content={og_url} />
                <meta property="og:site_name" content={og_site_name} />
                <meta name="twitter:card" content={twitter_card} />
                <meta name="twitter:description" content={twitter_description} />
                <meta name="twitter:title" content={twitter_title} />
                <meta name="twitter:image" content={twitter_image} />
                <meta name="msapplication-TileImage" content={msapplication_tileimage} />
            </Head>
            <div id="root">
                    <Header header = {header_footer} header_class = {header_class}/>
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