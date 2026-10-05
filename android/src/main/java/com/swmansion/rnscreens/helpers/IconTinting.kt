package com.swmansion.rnscreens.helpers

internal enum class IconTinting {
    DEFAULT,
    TINTED,
    ORIGINAL,
    ;

    companion object {
        fun fromString(value: String?): IconTinting =
            when (value) {
                "tinted" -> TINTED
                "original" -> ORIGINAL
                else -> DEFAULT
            }
    }
}
