"""Defines the site configuration data on a variable named `meta`.

The meta variable should at a minimum define two keys `pages` and `static`:

meta = {
  'pages': {
    '/': {
      'description': 'This is the index page description.'
    },
    '/hello/': {
      'descriptions': 'This is the hello page description.'
    }
  },
  'static': {
    '/src/static/': '/static/'
  }
}

The value of each url key in `meta.page` will be assigned to the `g.meta` flask
variable during the page render. For instance, the above will make
{{g.meta.description}} in a template render to "This is the index page
description."

The key to `meta.static` denotes the location of your static file directory in
your project, and the value denotes the directory the files are to be
served at in production. At this time, only one static directory is
supported out of the box.

"""

# Non-intl paths for the site
paths = [
    '/',
    '/demo/'
]

# Locales for the site.
locales = [
    'ALL_ae',
    'ALL_ar',
    'ALL_at',
    'ALL_au',
    'ALL_be',
    'ALL_bg',
    'ALL_bo',
    'ALL_br',
    'ALL_ca',
    'ALL_cl',
    'ALL_cn',
    'ALL_co',
    'ALL_cr',
    'ALL_cy',
    'ALL_cz',
    'ALL_de',
    'ALL_dk',
    'ALL_do',
    'ALL_dz',
    'ALL_ec',
    'ALL_ee',
    'ALL_eg',
    'ALL_es',
    'ALL_fi',
    'ALL_fr',
    'ALL_gr',
    'ALL_gt',
    'ALL_hk',
    'ALL_hn',
    'ALL_hr',
    'ALL_hu',
    'ALL_id',
    'ALL_ie',
    'ALL_il',
    'ALL_in',
    'ALL_it',
    'ALL_jp',
    'ALL_kr',
    'ALL_lt',
    'ALL_lv',
    'ALL_mx',
    'ALL_my',
    'ALL_ng',
    'ALL_ni',
    'ALL_nl',
    'ALL_no',
    'ALL_nz',
    'ALL_pa',
    'ALL_pe',
    'ALL_pk',
    'ALL_pl',
    'ALL_pr',
    'ALL_pt',
    'ALL_py',
    'ALL_ro',
    'ALL_rs',
    'ALL_ru',
    'ALL_sa',
    'ALL_se',
    'ALL_sg',
    'ALL_si',
    'ALL_sk',
    'ALL_sv',
    'ALL_th',
    'ALL_tn',
    'ALL_tr',
    'ALL_tw',
    'ALL_ua',
    'ALL_uk',
    'ALL_uy',
    'ALL_ve',
    'ALL_vn',
    'ALL_za',
    'af_ALL',
    'am_ALL',
    'ar_ALL',
    'ar_dz',
    'be_ALL',
    'bg_ALL',
    'bn_ALL',
    'bs_ALL',
    'ca_ALL',
    'ca_es',
    'cs_ALL',
    'da_ALL',
    'de_ALL',
    'de_ch',
    'de_de',
    'el_ALL',
    'en-GB_ALL',
    'en_hk',
    'en_ph',
    'en_uk',
    'en_us',
    'es-419_ALL',
    'es_ALL',
    'et_ALL',
    'eu_ALL',
    'fa_ALL',
    'fi_ALL',
    'fil_ALL',
    'fil_ph',
    'fr-CA_ALL',
    'fr_ALL',
    'fr_be',
    'fr_ca',
    'fr_ch',
    'fr_fr',
    'fr_tn',
    'gl_ALL',
    'gu_ALL',
    'hi_ALL',
    'hi_in',
    'hr_ALL',
    'hu_ALL',
    'id_ALL',
    'is_ALL',
    'it_ALL',
    'iw_ALL',
    'ja_ALL',
    'ja_jp',
    'ka_ALL',
    'km_ALL',
    'kn_ALL',
    'ko_ALL',
    'lo_ALL',
    'lt_ALL',
    'lv_ALL',
    'mk_ALL',
    'ml_ALL',
    'mn_ALL',
    'mr_ALL',
    'ms_ALL',
    'ms_my',
    'ne_ALL',
    'nl_ALL',
    'no_ALL',
    'pa_ALL',
    'pl_ALL',
    'pt-BR_ALL',
    'pt-PT_ALL',
    'rm_ALL',
    'ro_ALL',
    'ru_ALL',
    'ru_by',
    'ru_kz',
    'si_ALL',
    'sk_ALL',
    'sl_ALL',
    'sq_ALL',
    'sr_ALL',
    'sv_ALL',
    'sw_ALL',
    'ta_ALL',
    'te_ALL',
    'th_ALL',
    'tr_ALL',
    'uk_ALL',
    'ur_ALL',
    'vi_ALL',
    'zh-CN_ALL',
    'zh-TW_ALL',
    'zu_ALL',
]

# Will store all our pages.
pages = {}

# Create the root pages.
for path in paths:
  pages[path] = {}

# Create the intl pages.
for locale in locales:
  for path in paths:
    pages[('/intl/' + locale + path)] = {}

# Declare the meta configuration object.
meta = {
    'pages': pages,
    'static': {
        '/src/static/': '/static/'
    }
}
