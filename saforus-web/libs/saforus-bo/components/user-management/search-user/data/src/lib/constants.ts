import { TOption } from '@web-workspace/saforus-bo/common/model';
import { Country } from './interface';

export const TimeZone: TOption[] = [
  { label: '(GMT-12:00) International Date Line West', value: 'dateline' },
  { label: '(GMT-11:00) Midway Island, Samoa', value: 'samoa' },
  { label: '(GMT-10:00) Hawaii', value: 'hawaii' },
  { label: '(GMT-09:00) Alaska', value: 'alaska' },
  {
    label: '(GMT-08:00) Pacific Time (US and Canada); Tijuana',
    value: 'pacific-us-canada',
  },
  {
    label: '(GMT-07:00) Mountain Time (US and Canada)',
    value: 'mountain-us-canada',
  },
  { label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan', value: 'mexico-2' },
  { label: '(GMT-07:00) Arizona', value: 'us-mountain' },
  {
    label: '(GMT-06:00) Central Time (US and Canada)',
    value: 'central-us-canada',
  },
  { label: '(GMT-06:00) Saskatchewan', value: 'canada-central' },
  { label: '(GMT-06:00) Guadalajara, Mexico City, Monterrey', value: 'mexico' },
  { label: '(GMT-06:00) Central America', value: 'central-america' },
  {
    label: '(GMT-05:00) Eastern Time (US and Canada)',
    value: 'eastern-us-canada',
  },
  { label: '(GMT-05:00) Indiana (East)', value: 'us-eastern' },
  { label: '(GMT-05:00) Bogota, Lima, Quito', value: 's.a.-pacific' },
  { label: '(GMT-04:00) Atlantic Time (Canada)', value: 'atlantic-canada' },
  { label: '(GMT-04:00) Caracas, La Paz', value: 's.a.-western' },
  { label: '(GMT-04:00) Santiago', value: 'pacific-s.a.' },
  {
    label: '(GMT-03:30) Newfoundland and Labrador',
    value: 'newfoundland-labrador',
  },
  { label: '(GMT-03:00) Brasilia', value: 'e.south-america' },
  { label: '(GMT-03:00) Buenos Aires, Georgetown', value: 's.a.-eastern' },
  { label: '(GMT-03:00) Greenland', value: 'greenland' },
  { label: '(GMT-02:00) Mid-Atlantic', value: 'mid-atlantic' },
  { label: '(GMT-01:00) Azores', value: 'azores' },
  { label: '(GMT-01:00) Cape Verde Islands', value: 'cape-verde' },
  {
    label: '(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',
    value: 'gmt',
  },
  { label: '(GMT) Casablanca, Monrovia', value: 'greenwich' },
  {
    label: '(GMT 01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
    value: 'central-europe',
  },
  {
    label: '(GMT 01:00) Sarajevo, Skopje, Warsaw, Zagreb',
    value: 'central-european',
  },
  {
    label: '(GMT 01:00) Brussels, Copenhagen, Madrid, Paris',
    value: 'romance',
  },
  {
    label: '(GMT 01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
    value: 'w.europe',
  },
  { label: '(GMT 01:00) West Central Africa', value: 'w.central-africa' },
  { label: '(GMT 02:00) Bucharest', value: 'e.europe' },
  { label: '(GMT 02:00) Cairo', value: 'egypt' },
  {
    label: '(GMT 02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius',
    value: 'fle',
  },
  { label: '(GMT 02:00) Athens, Istanbul, Minsk', value: 'gtb' },
  { label: '(GMT 02:00) Jerusalem', value: 'israel' },
  { label: '(GMT 02:00) Harare, Pretoria', value: 'south-africa' },
  { label: '(GMT 03:00) Moscow, St. Petersburg, Volgograd', value: 'russian' },
  { label: '(GMT 03:00) Kuwait, Riyadh', value: 'arab' },
  { label: '(GMT 03:00) Nairobi', value: 'e.africa' },
  { label: '(GMT 03:00) Baghdad', value: 'arabic' },
  { label: '(GMT 03:30) Tehran', value: 'iran' },
  { label: '(GMT 04:00) Abu Dhabi, Muscat', value: 'arabian' },
  { label: '(GMT 04:00) Baku, Tbilisi, Yerevan', value: 'caucasus' },
  { label: '(GMT 04:30) Kabul', value: 'transitional-afghanistan' },
  { label: '(GMT 05:00) Ekaterinburg', value: 'ekaterinburg' },
  { label: '(GMT 05:00) Islamabad, Karachi, Tashkent', value: 'west-asia' },
  { label: '(GMT 05:30) Chennai, Kolkata, Mumbai, New Delhi', value: 'india' },
  { label: '(GMT 05:45) Kathmandu', value: 'nepal' },
  { label: '(GMT 06:00) Astana, Dhaka', value: 'central-asia' },
  { label: '(GMT 06:00) Sri Jayawardenepura', value: 'sri-lanka' },
  { label: '(GMT 06:00) Almaty, Novosibirsk', value: 'n.central-asia' },
  { label: '(GMT 06:30) Yangon (Rangoon)', value: 'myanmar' },
  { label: '(GMT 07:00) Bangkok, Hanoi, Jakarta', value: 's.e.-asia' },
  { label: '(GMT 07:00) Krasnoyarsk', value: 'north-asia' },
  {
    label: '(GMT 08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi',
    value: 'china',
  },
  { label: '(GMT 08:00) Kuala Lumpur, Singapore', value: 'singapore' },
  { label: '(GMT 08:00) Taipei', value: 'taipei' },
  { label: '(GMT 08:00) Perth', value: 'w.australia' },
  { label: '(GMT 08:00) Irkutsk, Ulaanbaatar', value: 'n.asia-east' },
  { label: '(GMT 09:00) Seoul', value: 'korea' },
  { label: '(GMT 09:00) Osaka, Sapporo, Tokyo', value: 'tokyo' },
  { label: '(GMT 09:00) Yakutsk', value: 'yakutsk' },
  { label: '(GMT 09:30) Darwin', value: 'a.u.s.-central' },
  { label: '(GMT 09:30) Adelaide', value: 'cen.-australia' },
  { label: '(GMT 10:00) Canberra, Melbourne, Sydney', value: 'a.u.s.-eastern' },
  { label: '(GMT 10:00) Brisbane', value: 'e.australia' },
  { label: '(GMT 10:00) Hobart', value: 'tasmania' },
  { label: '(GMT 10:00) Vladivostok', value: 'vladivostok' },
  { label: '(GMT 10:00) Guam, Port Moresby', value: 'w.pacific' },
  {
    label: '(GMT 11:00) Magadan, Solomon Islands, New Caledonia',
    value: 'c.pacific',
  },
  {
    label: '(GMT 12:00) Fiji Islands, Kamchatka, Marshall Islands',
    value: 'fiji',
  },
  { label: '(GMT 12:00) Auckland, Wellington', value: 'new-zealand' },
];

export const Languages = [
  { label: 'Vietnamese (VI)', value: 'vi' },
  { label: 'English (EN)', value: 'en' },
  { label: 'Spanish (ES)', value: 'es' },
  { label: 'French (FR)', value: 'fr' },
  { label: 'German (DE)', value: 'de' },
  { label: 'Italian (IT)', value: 'it' },
  { label: 'Portuguese (PT)', value: 'pt' },
  { label: 'Russian (RU)', value: 'ru' },
  { label: 'Japanese (JA)', value: 'ja' },
  { label: 'Chinese (ZH)', value: 'zh' },
  { label: 'Korean (KO)', value: 'ko' },
  { label: 'Arabic (AR)', value: 'ar' },
  { label: 'Turkish (TR)', value: 'tr' },
  { label: 'Dutch (NL)', value: 'nl' },
  { label: 'Swedish (SV)', value: 'sv' },
  { label: 'Danish (DA)', value: 'da' },
  { label: 'Norwegian (NO)', value: 'no' },
  { label: 'Finnish (FI)', value: 'fi' },
  { label: 'Greek (EL)', value: 'el' },
  { label: 'Polish (PL)', value: 'pl' },
  { label: 'Thai (TH)', value: 'th' },
  { label: 'Hindi (HI)', value: 'hi' },
  { label: 'Indonesian (ID)', value: 'id' },
  { label: 'Vietnamese (VI)', value: 'vi' },
  { label: 'Czech (CS)', value: 'cs' },
  { label: 'Hungarian (HU)', value: 'hu' },
  { label: 'Hebrew (HE)', value: 'he' },
  { label: 'Ukrainian (UK)', value: 'uk' },
  { label: 'Romanian (RO)', value: 'ro' },
  { label: 'Bulgarian (BG)', value: 'bg' },
  { label: 'Croatian (HR)', value: 'hr' },
  { label: 'Slovak (SK)', value: 'sk' },
  { label: 'Slovenian (SL)', value: 'sl' },
  { label: 'Lithuanian (LT)', value: 'lt' },
  { label: 'Latvian (LV)', value: 'lv' },
  { label: 'Estonian (ET)', value: 'et' },
  { label: 'Serbian (SR)', value: 'sr' },
  { label: 'Macedonian (MK)', value: 'mk' },
  { label: 'Bosnian (BS)', value: 'bs' },
  { label: 'Albanian (SQ)', value: 'sq' },
  { label: 'Montenegrin (ME)', value: 'me' },
  { label: 'Georgian (KA)', value: 'ka' },
  { label: 'Armenian (HY)', value: 'hy' },
  { label: 'Azerbaijani (AZ)', value: 'az' },
  { label: 'Kazakh (KK)', value: 'kk' },
  { label: 'Belarusian (BE)', value: 'be' },
  { label: 'Uzbek (UZ)', value: 'uz' },
  { label: 'Kyrgyz (KY)', value: 'ky' },
  { label: 'Tajik (TG)', value: 'tg' },
  { label: 'Turkmen (TK)', value: 'tk' },
  { label: 'Mongolian (MN)', value: 'mn' },
  { label: 'Persian (FA)', value: 'fa' },
  { label: 'Urdu (UR)', value: 'ur' },
  { label: 'Bengali (BN)', value: 'bn' },
  { label: 'Punjabi (PA)', value: 'pa' },
  { label: 'Gujarati (GU)', value: 'gu' },
  { label: 'Oriya (OR)', value: 'or' },
  { label: 'Tamil (TA)', value: 'ta' },
  { label: 'Telugu (TE)', value: 'te' },
  { label: 'Kannada (KN)', value: 'kn' },
  { label: 'Malayalam (ML)', value: 'ml' },
  { label: 'Sinhala (SI)', value: 'si' },
  { label: 'Nepali (NE)', value: 'ne' },
  { label: 'Sanskrit (SA)', value: 'sa' },
  { label: 'Māori (MI)', value: 'mi' },
  { label: 'Samoan (SM)', value: 'sm' },
  { label: 'Tongan (TO)', value: 'to' },
  { label: 'Fijian (FJ)', value: 'fj' },
  { label: 'Hawaiian (HAW)', value: 'haw' },
];

export const COUNTRIES: Country[] = [
  {
    countryCode: 93,
    shortName: 'AF',
    country: 'Afghanistan'
  },
  {
    countryCode: 355,
    shortName: 'AL',
    country: 'Albania'
  },
  {
    countryCode: 213,
    shortName: 'DZ',
    country: 'Algeria'
  },
  {
    countryCode: '1-684',
    shortName: 'AS',
    country: 'American Samoa'
  },
  {
    countryCode: 376,
    shortName: 'AD',
    country: 'Andorra'
  },
  {
    countryCode: 244,
    shortName: 'AO',
    country: 'Angola'
  },
  {
    countryCode: '1-264',
    shortName: 'AI',
    country: 'Anguilla'
  },
  {
    countryCode: 672,
    shortName: 'AQ',
    country: 'Antarctica'
  },
  {
    countryCode: '1-268',
    shortName: 'AG',
    country: 'Antigua and Barbuda'
  },
  {
    countryCode: 54,
    shortName: 'AR',
    country: 'Argentina'
  },
  {
    countryCode: 374,
    shortName: 'AM',
    country: 'Armenia'
  },
  {
    countryCode: 297,
    shortName: 'AW',
    country: 'Aruba'
  },
  {
    countryCode: 61,
    shortName: 'AU',
    country: 'Australia'
  },
  {
    countryCode: 43,
    shortName: 'AT',
    country: 'Austria'
  },
  {
    countryCode: 994,
    shortName: 'AZ',
    country: 'Azerbaijan'
  },
  {
    countryCode: '1-242',
    shortName: 'BS',
    country: 'Bahamas'
  },
  {
    countryCode: 973,
    shortName: 'BH',
    country: 'Bahrain'
  },
  {
    countryCode: 880,
    shortName: 'BD',
    country: 'Bangladesh'
  },
  {
    countryCode: '1-246',
    shortName: 'BB',
    country: 'Barbados'
  },
  {
    countryCode: 375,
    shortName: 'BY',
    country: 'Belarus'
  },
  {
    countryCode: 32,
    shortName: 'BE',
    country: 'Belgium'
  },
  {
    countryCode: 501,
    shortName: 'BZ',
    country: 'Belize'
  },
  {
    countryCode: 229,
    shortName: 'BJ',
    country: 'Benin'
  },
  {
    countryCode: '1-441',
    shortName: 'BM',
    country: 'Bermuda'
  },
  {
    countryCode: 975,
    shortName: 'BT',
    country: 'Bhutan'
  },
  {
    countryCode: 591,
    shortName: 'BO',
    country: 'Bolivia'
  },
  {
    countryCode: 387,
    shortName: 'BA',
    country: 'Bosnia and Herzegovina'
  },
  {
    countryCode: 267,
    shortName: 'BW',
    country: 'Botswana'
  },
  {
    countryCode: 55,
    shortName: 'BR',
    country: 'Brazil'
  },
  {
    countryCode: '1-284',
    shortName: 'VG',
    country: 'British Virgin Islands'
  },
  {
    countryCode: 673,
    shortName: 'BN',
    country: 'Brunei'
  },
  {
    countryCode: 359,
    shortName: 'BG',
    country: 'Bulgaria'
  },
  {
    countryCode: 226,
    shortName: 'BF',
    country: 'Burkina Faso'
  },
  {
    countryCode: 257,
    shortName: 'BI',
    country: 'Burundi'
  },
  {
    countryCode: 855,
    shortName: 'KH',
    country: 'Cambodia'
  },
  {
    countryCode: 237,
    shortName: 'CM',
    country: 'Cameroon'
  },
  {
    countryCode: 1,
    shortName: 'CA',
    country: 'Canada'
  },
  {
    countryCode: 238,
    shortName: 'CV',
    country: 'Cape Verde'
  },
  {
    countryCode: '1-345',
    shortName: 'KY',
    country: 'Cayman Islands'
  },
  {
    countryCode: 236,
    shortName: 'CF',
    country: 'Central African Republic'
  },
  {
    countryCode: 235,
    shortName: 'TD',
    country: 'Chad'
  },
  {
    countryCode: 56,
    shortName: 'CL',
    country: 'Chile'
  },
  {
    countryCode: 86,
    shortName: 'CN',
    country: 'China'
  },
  {
    countryCode: 61,
    shortName: 'CX',
    country: 'Christmas Island'
  },
  {
    countryCode: 61,
    shortName: 'CC',
    country: 'Cocos Islands'
  },
  {
    countryCode: 57,
    shortName: 'CO',
    country: 'Colombia'
  },
  {
    countryCode: 269,
    shortName: 'KM',
    country: 'Comoros'
  },
  {
    countryCode: 682,
    shortName: 'CK',
    country: 'Cook Islands'
  },
  {
    countryCode: 506,
    shortName: 'CR',
    country: 'Costa Rica'
  },
  {
    countryCode: 385,
    shortName: 'HR',
    country: 'Croatia'
  },
  {
    countryCode: 53,
    shortName: 'CU',
    country: 'Cuba'
  },
  {
    countryCode: 599,
    shortName: 'CW',
    country: 'Curacao'
  },
  {
    countryCode: 357,
    shortName: 'CY',
    country: 'Cyprus'
  },
  {
    countryCode: 420,
    shortName: 'CZ',
    country: 'Czech Republic'
  },
  {
    countryCode: 243,
    shortName: 'CD',
    country: 'Democratic Republic of the Congo'
  },
  {
    countryCode: 45,
    shortName: 'DK',
    country: 'Denmark'
  },
  {
    countryCode: 253,
    shortName: 'DJ',
    country: 'Djibouti'
  },
  {
    countryCode: '1-767',
    shortName: 'DM',
    country: 'Dominica'
  },
  {
    countryCode: '1-809',
    shortName: 'DO',
    country: 'Dominican Republic'
  },
  {
    countryCode: 670,
    shortName: 'TL',
    country: 'East Timor'
  },
  {
    countryCode: 593,
    shortName: 'EC',
    country: 'Ecuador'
  },
  {
    countryCode: 20,
    shortName: 'EG',
    country: 'Egypt'
  },
  {
    countryCode: 503,
    shortName: 'SV',
    country: 'El Salvador'
  },
  {
    countryCode: 240,
    shortName: 'GQ',
    country: 'Equatorial Guinea'
  },
  {
    countryCode: 291,
    shortName: 'ER',
    country: 'Eritrea'
  },
  {
    countryCode: 372,
    shortName: 'EE',
    country: 'Estonia'
  },
  {
    countryCode: 251,
    shortName: 'ET',
    country: 'Ethiopia'
  },
  {
    countryCode: 500,
    shortName: 'FK',
    country: 'Falkland Islands'
  },
  {
    countryCode: 298,
    shortName: 'FO',
    country: 'Faroe Islands'
  },
  {
    countryCode: 679,
    shortName: 'FJ',
    country: 'Fiji'
  },
  {
    countryCode: 358,
    shortName: 'FI',
    country: 'Finland'
  },
  {
    countryCode: 33,
    shortName: 'FR',
    country: 'France'
  },
  {
    countryCode: 594,
    shortName: 'GF',
    country: 'French Guiana'
  },
  {
    countryCode: 689,
    shortName: 'PF',
    country: 'French Polynesia'
  },
  {
    countryCode: 241,
    shortName: 'GA',
    country: 'Gabon'
  },
  {
    countryCode: 220,
    shortName: 'GM',
    country: 'Gambia'
  },
  {
    countryCode: 995,
    shortName: 'GE',
    country: 'Georgia'
  },
  {
    countryCode: 49,
    shortName: 'DE',
    country: 'Germany'
  },
  {
    countryCode: 233,
    shortName: 'GH',
    country: 'Ghana'
  },
  {
    countryCode: 350,
    shortName: 'GI',
    country: 'Gibraltar'
  },
  {
    countryCode: 30,
    shortName: 'GR',
    country: 'Greece'
  },
  {
    countryCode: 299,
    shortName: 'GL',
    country: 'Greenland'
  },
  {
    countryCode: '1-473',
    shortName: 'GD',
    country: 'Grenada'
  },
  {
    countryCode: 590,
    shortName: 'GP',
    country: 'Guadeloupe'
  },
  {
    countryCode: '1-671',
    shortName: 'GU',
    country: 'Guam'
  },
  {
    countryCode: 502,
    shortName: 'GT',
    country: 'Guatemala'
  },
  {
    countryCode: '44-1481',
    shortName: 'GG',
    country: 'Guernsey'
  },
  {
    countryCode: 224,
    shortName: 'GN',
    country: 'Guinea'
  },
  {
    countryCode: 245,
    shortName: 'GW',
    country: 'Guinea-Bissau'
  },
  {
    countryCode: 592,
    shortName: 'GY',
    country: 'Guyana'
  },
  {
    countryCode: 509,
    shortName: 'HT',
    country: 'Haiti'
  },
  {
    countryCode: 504,
    shortName: 'HN',
    country: 'Honduras'
  },
  {
    countryCode: 852,
    shortName: 'HK',
    country: 'Hong Kong'
  },
  {
    countryCode: 36,
    shortName: 'HU',
    country: 'Hungary'
  },
  {
    countryCode: 354,
    shortName: 'IS',
    country: 'Iceland'
  },
  {
    countryCode: 91,
    shortName: 'IN',
    country: 'India'
  },
  {
    countryCode: 62,
    shortName: 'ID',
    country: 'Indonesia'
  },
  {
    countryCode: 98,
    shortName: 'IR',
    country: 'Iran'
  },
  {
    countryCode: 964,
    shortName: 'IQ',
    country: 'Iraq'
  },
  {
    countryCode: 353,
    shortName: 'IE',
    country: 'Ireland'
  },
  {
    countryCode: '44-1624',
    shortName: 'IM',
    country: 'Isle of Man'
  },
  {
    countryCode: 972,
    shortName: 'IL',
    country: 'Israel'
  },
  {
    countryCode: 39,
    shortName: 'IT',
    country: 'Italy'
  },
  {
    countryCode: 225,
    shortName: 'CI',
    country: 'Ivory Coast'
  },
  {
    countryCode: 81,
    shortName: 'JP',
    country: 'Japan'
  },
  {
    countryCode: '44-1534',
    shortName: 'JE',
    country: 'Jersey'
  },
  {
    countryCode: 962,
    shortName: 'JO',
    country: 'Jordan'
  },
  {
    countryCode: 7,
    shortName: 'KZ',
    country: 'Kazakhstan'
  },
  {
    countryCode: 254,
    shortName: 'KE',
    country: 'Kenya'
  },
  {
    countryCode: 686,
    shortName: 'KI',
    country: 'Kiribati'
  },
  {
    countryCode: 383,
    shortName: 'XK',
    country: 'Kosovo'
  },
  {
    countryCode: 965,
    shortName: 'KW',
    country: 'Kuwait'
  },
  {
    countryCode: 996,
    shortName: 'KG',
    country: 'Kyrgyzstan'
  },
  {
    countryCode: 856,
    shortName: 'LA',
    country: 'Laos'
  },
  {
    countryCode: 371,
    shortName: 'LV',
    country: 'Latvia'
  },
  {
    countryCode: 961,
    shortName: 'LB',
    country: 'Lebanon'
  },
  {
    countryCode: 266,
    shortName: 'LS',
    country: 'Lesotho'
  },
  {
    countryCode: 231,
    shortName: 'LR',
    country: 'Liberia'
  },
  {
    countryCode: 218,
    shortName: 'LY',
    country: 'Libya'
  },
  {
    countryCode: 423,
    shortName: 'LI',
    country: 'Liechtenstein'
  },
  {
    countryCode: 370,
    shortName: 'LT',
    country: 'Lithuania'
  },
  {
    countryCode: 352,
    shortName: 'LU',
    country: 'Luxembourg'
  },
  {
    countryCode: 853,
    shortName: 'MO',
    country: 'Macau'
  },
  {
    countryCode: 389,
    shortName: 'MK',
    country: 'Macedonia'
  },
  {
    countryCode: 261,
    shortName: 'MG',
    country: 'Madagascar'
  },
  {
    countryCode: 265,
    shortName: 'MW',
    country: 'Malawi'
  },
  {
    countryCode: 60,
    shortName: 'MY',
    country: 'Malaysia'
  },
  {
    countryCode: 960,
    shortName: 'MV',
    country: 'Maldives'
  },
  {
    countryCode: 223,
    shortName: 'ML',
    country: 'Mali'
  },
  {
    countryCode: 356,
    shortName: 'MT',
    country: 'Malta'
  },
  {
    countryCode: 692,
    shortName: 'MH',
    country: 'Marshall Islands'
  },
  {
    countryCode: 222,
    shortName: 'MR',
    country: 'Mauritania'
  },
  {
    countryCode: 230,
    shortName: 'MU',
    country: 'Mauritius'
  },
  {
    countryCode: 262,
    shortName: 'YT',
    country: 'Mayotte'
  },
  {
    countryCode: 52,
    shortName: 'MX',
    country: 'Mexico'
  },
  {
    countryCode: 691,
    shortName: 'FM',
    country: 'Micronesia'
  },
  {
    countryCode: 373,
    shortName: 'MD',
    country: 'Moldova'
  },
  {
    countryCode: 377,
    shortName: 'MC',
    country: 'Monaco'
  },
  {
    countryCode: 976,
    shortName: 'MN',
    country: 'Mongolia'
  },
  {
    countryCode: 382,
    shortName: 'ME',
    country: 'Montenegro'
  },
  {
    countryCode: '1-664',
    shortName: 'MS',
    country: 'Montserrat'
  },
  {
    countryCode: 212,
    shortName: 'MA',
    country: 'Morocco'
  },
  {
    countryCode: 258,
    shortName: 'MZ',
    country: 'Mozambique'
  },
  {
    countryCode: 95,
    shortName: 'MM',
    country: 'Myanmar'
  },
  {
    countryCode: 264,
    shortName: 'NA',
    country: 'Namibia'
  },
  {
    countryCode: 674,
    shortName: 'NR',
    country: 'Nauru'
  },
  {
    countryCode: 977,
    shortName: 'NP',
    country: 'Nepal'
  },
  {
    countryCode: 31,
    shortName: 'NL',
    country: 'Netherlands'
  },
  {
    countryCode: 687,
    shortName: 'NC',
    country: 'New Caledonia'
  },
  {
    countryCode: 64,
    shortName: 'NZ',
    country: 'New Zealand'
  },
  {
    countryCode: 505,
    shortName: 'NI',
    country: 'Nicaragua'
  },
  {
    countryCode: 227,
    shortName: 'NE',
    country: 'Niger'
  },
  {
    countryCode: 234,
    shortName: 'NG',
    country: 'Nigeria'
  },
  {
    countryCode: 683,
    shortName: 'NU',
    country: 'Niue'
  },
  {
    countryCode: 672,
    shortName: 'NF',
    country: 'Norfolk Island'
  },
  {
    countryCode: 850,
    shortName: 'KP',
    country: 'North Korea'
  },
  {
    countryCode: '1-670',
    shortName: 'MP',
    country: 'Northern Mariana Islands'
  },
  {
    countryCode: 47,
    shortName: 'NO',
    country: 'Norway'
  },
  {
    countryCode: 968,
    shortName: 'OM',
    country: 'Oman'
  },
  {
    countryCode: 92,
    shortName: 'PK',
    country: 'Pakistan'
  },
  {
    countryCode: 680,
    shortName: 'PW',
    country: 'Palau'
  },
  {
    countryCode: 970,
    shortName: 'PS',
    country: 'Palestinian Territory'
  },
  {
    countryCode: 507,
    shortName: 'PA',
    country: 'Panama'
  },
  {
    countryCode: 675,
    shortName: 'PG',
    country: 'Papua New Guinea'
  },
  {
    countryCode: 595,
    shortName: 'PY',
    country: 'Paraguay'
  },
  {
    countryCode: 51,
    shortName: 'PE',
    country: 'Peru'
  },
  {
    countryCode: 63,
    shortName: 'PH',
    country: 'Philippines'
  },
  {
    countryCode: 48,
    shortName: 'PL',
    country: 'Poland'
  },
  {
    countryCode: 351,
    shortName: 'PT',
    country: 'Portugal'
  },
  {
    countryCode: '1-787',
    shortName: 'PR',
    country: 'Puerto Rico'
  },
  {
    countryCode: 974,
    shortName: 'QA',
    country: 'Qatar'
  },
  {
    countryCode: 242,
    shortName: 'CG',
    country: 'Republic of the Congo'
  },
  {
    countryCode: 262,
    shortName: 'RE',
    country: 'Reunion'
  },
  {
    countryCode: 40,
    shortName: 'RO',
    country: 'Romania'
  },
  {
    countryCode: 7,
    shortName: 'RU',
    country: 'Russia'
  },
  {
    countryCode: 250,
    shortName: 'RW',
    country: 'Rwanda'
  },
  {
    countryCode: 590,
    shortName: 'BL',
    country: 'Saint Barthelemy'
  },
  {
    countryCode: 290,
    shortName: 'SH',
    country: 'Saint Helena'
  },
  {
    countryCode: '1-869',
    shortName: 'KN',
    country: 'Saint Kitts and Nevis'
  },
  {
    countryCode: '1-758',
    shortName: 'LC',
    country: 'Saint Lucia'
  },
  {
    countryCode: 590,
    shortName: 'MF',
    country: 'Saint Martin'
  },
  {
    countryCode: 508,
    shortName: 'PM',
    country: 'Saint Pierre and Miquelon'
  },
  {
    countryCode: '1-784',
    shortName: 'VC',
    country: 'Saint Vincent and the Grenadines'
  },
  {
    countryCode: 685,
    shortName: 'WS',
    country: 'Samoa'
  },
  {
    countryCode: 378,
    shortName: 'SM',
    country: 'San Marino'
  },
  {
    countryCode: 239,
    shortName: 'ST',
    country: 'Sao Tome and Principe'
  },
  {
    countryCode: 966,
    shortName: 'SA',
    country: 'Saudi Arabia'
  },
  {
    countryCode: 221,
    shortName: 'SN',
    country: 'Senegal'
  },
  {
    countryCode: 381,
    shortName: 'RS',
    country: 'Serbia'
  },
  {
    countryCode: 248,
    shortName: 'SC',
    country: 'Seychelles'
  },
  {
    countryCode: 232,
    shortName: 'SL',
    country: 'Sierra Leone'
  },
  {
    countryCode: 65,
    shortName: 'SG',
    country: 'Singapore'
  },
  {
    countryCode: '1-721',
    shortName: 'SX',
    country: 'Sint Maarten'
  },
  {
    countryCode: 421,
    shortName: 'SK',
    country: 'Slovakia'
  },
  {
    countryCode: 386,
    shortName: 'SI',
    country: 'Slovenia'
  },
  {
    countryCode: 677,
    shortName: 'SB',
    country: 'Solomon Islands'
  },
  {
    countryCode: 252,
    shortName: 'SO',
    country: 'Somalia'
  },
  {
    countryCode: 27,
    shortName: 'ZA',
    country: 'South Africa'
  },
  {
    countryCode: 82,
    shortName: 'KR',
    country: 'South Korea'
  },
  {
    countryCode: 211,
    shortName: 'SS',
    country: 'South Sudan'
  },
  {
    countryCode: 34,
    shortName: 'ES',
    country: 'Spain'
  },
  {
    countryCode: 94,
    shortName: 'LK',
    country: 'Sri Lanka'
  },
  {
    countryCode: 249,
    shortName: 'SD',
    country: 'Sudan'
  },
  {
    countryCode: 597,
    shortName: 'SR',
    country: 'Suriname'
  },
  {
    countryCode: 47,
    shortName: 'SJ',
    country: 'Svalbard and Jan Mayen'
  },
  {
    countryCode: 268,
    shortName: 'SZ',
    country: 'Swaziland'
  },
  {
    countryCode: 46,
    shortName: 'SE',
    country: 'Sweden'
  },
  {
    countryCode: 41,
    shortName: 'CH',
    country: 'Switzerland'
  },
  {
    countryCode: 963,
    shortName: 'SY',
    country: 'Syria'
  },
  {
    countryCode: 886,
    shortName: 'TW',
    country: 'Taiwan'
  },
  {
    countryCode: 992,
    shortName: 'TJ',
    country: 'Tajikistan'
  },
  {
    countryCode: 255,
    shortName: 'TZ',
    country: 'Tanzania'
  },
  {
    countryCode: 66,
    shortName: 'TH',
    country: 'Thailand'
  },
  {
    countryCode: 228,
    shortName: 'TG',
    country: 'Togo'
  },
  {
    countryCode: 690,
    shortName: 'TK',
    country: 'Tokelau'
  },
  {
    countryCode: 676,
    shortName: 'TO',
    country: 'Tonga'
  },
  {
    countryCode: '1-868',
    shortName: 'TT',
    country: 'Trinidad and Tobago'
  },
  {
    countryCode: 216,
    shortName: 'TN',
    country: 'Tunisia'
  },
  {
    countryCode: 90,
    shortName: 'TR',
    country: 'Turkey'
  },
  {
    countryCode: 993,
    shortName: 'TM',
    country: 'Turkmenistan'
  },
  {
    countryCode: '1-649',
    shortName: 'TC',
    country: 'Turks and Caicos Islands'
  },
  {
    countryCode: 688,
    shortName: 'TV',
    country: 'Tuvalu'
  },
  {
    countryCode: '1-340',
    shortName: 'VI',
    country: 'U.S. Virgin Islands'
  },
  {
    countryCode: 256,
    shortName: 'UG',
    country: 'Uganda'
  },
  {
    countryCode: 380,
    shortName: 'UA',
    country: 'Ukraine'
  },
  {
    countryCode: 971,
    shortName: 'AE',
    country: 'United Arab Emirates'
  },
  {
    countryCode: 44,
    shortName: 'GB',
    country: 'United Kingdom'
  },
  {
    countryCode: 1,
    shortName: 'US',
    country: 'United States'
  },
  {
    countryCode: 598,
    shortName: 'UY',
    country: 'Uruguay'
  },
  {
    countryCode: 998,
    shortName: 'UZ',
    country: 'Uzbekistan'
  },
  {
    countryCode: 678,
    shortName: 'VU',
    country: 'Vanuatu'
  },
  {
    countryCode: '39-06',
    shortName: 'VA',
    country: 'Vatican'
  },
  {
    countryCode: 58,
    shortName: 'VE',
    country: 'Venezuela'
  },
  {
    countryCode: 84,
    shortName: 'VN',
    country: 'Vietnam'
  },
  {
    countryCode: 681,
    shortName: 'WF',
    country: 'Wallis and Futuna'
  },
  {
    countryCode: 212,
    shortName: 'EH',
    country: 'Western Sahara'
  },
  {
    countryCode: 967,
    shortName: 'YE',
    country: 'Yemen'
  },
  {
    countryCode: 260,
    shortName: 'ZM',
    country: 'Zambia'
  },
  {
    countryCode: 263,
    shortName: 'ZW',
    country: 'Zimbabwe'
  }
]

export const formatedCountries = COUNTRIES.map((el) => {
  return {
    value: el.countryCode,
    label: el.country,
  } as TOption;
})